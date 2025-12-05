---
title: Services
---

A **service** is any long‑running process that listens on a network port and responds to requests.

## Single Service

To run a single service on Nosana, define a `container/run` operation with the `expose` argument specifying which port(s) to expose:

```json
{
  "version": "0.1",
  "type": "container",
  "ops": [
    {
      "type": "container/run",
      "id": "my-service",
      "args": {
        "image": "nginx:latest",
        "expose": 80
      }
    }
  ]
}
```

The `expose` argument accepts either a single port number or an array of ports:

```json
"expose": 8080
```

```json
"expose": [8000, 9000]
```

## Multiple Services

Modern applications usually orchestrate several such services working together.

Nosana supports two approaches for running multiple services:

| Approach | Description | Best For |
|----------|-------------|----------|
| **Multi-Service Container** | Bundle services into a single container image | Shared resources (GPU/memory), minimal latency |
| **Multi-Operations** | Run separate operations in parallel | Independent scaling, fault isolation |

### Multi-Service Container

**Job Definition**

When exposing multiple ports from a single container, use an array:

```json
{
  "version": "0.1",
  "type": "container",
  "meta": {
    "trigger": "dashboard",
    "system_requirements": {
      "required_vram": 6
    }
  },
  "ops": [
    {
      "type": "container/run",
      "id": "multi-service",
      "args": {
        "image": "docker.io/username/multi-service:latest",
        "gpu": true,
        "expose": [8000, 9000]
      }
    }
  ]
}
```

### Multi-Operations

Run multiple separate operations that execute in parallel with dependency control. Operations communicate via container networking using their operation ID as hostname.

**Execution Groups and Dependencies**

Operations are organized using the `execution` block:

```json
"execution": {
  "group": "string",
  "depends_on": ["op-id-1", "op-id-2"]
}
```

| Field | Description |
|-------|-------------|
| `group` | Execution stage name. The manager runs one stage at a time, but operations within a stage run in parallel |
| `depends_on` | List of operation IDs this operation must wait for before starting |

**Inter-Service Communication**

Operations reference each other by their operation ID. For example, if `vllm-server` exposes port 9000, another operation can reach it at `http://vllm-server:9000`:

```json
{
  "type": "container/run",
  "id": "open-webui",
  "args": {
    "image": "ghcr.io/open-webui/open-webui:main",
    "env": {
      "OPENAI_API_BASE_URL": "http://vllm-server:9000/v1"
    },
    "expose": [8080]
  },
  "execution": {
    "group": "inference",
    "depends_on": ["vllm-server"]
  }
}
```

**Health Checks**

Use health checks to ensure dependent services are ready before starting:

```json
{
  "type": "container/run",
  "id": "vllm-server",
  "args": {
    "image": "vllm/vllm-openai:latest",
    "cmd": ["--model", "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B", "--port", "9000"],
    "gpu": true,
    "expose": [
      {
        "port": 9000,
        "health_checks": [
          {
            "type": "http",
            "path": "/v1/models",
            "method": "GET",
            "expected_status": 200,
            "continuous": true
          }
        ]
      }
    ]
  },
  "execution": {
    "group": "inference"
  }
}
```

## Operation States

Operations progress through the following states:

`pending` → `running` → `completed` | `failed`

## Controlling Operations

Control running operations via the Node API:

| Action | Endpoint |
|--------|----------|
| Check operation status | `GET /job/{{job}}/ops` |
| Stop operation | `POST /job/{{job}}/group/{{group}}/operation/{{opid}}/stop` |
| Restart operation | `POST /job/{{job}}/group/{{group}}/operation/{{opid}}/restart` |
| Stop group | `POST /job/{{job}}/group/{{group}}/stop` |
| Restart group | `POST /job/{{job}}/group/{{group}}/restart` |

Base URL: `https://{{node}}.node.k8s.prd.nos.ci`

## Examples

### vLLM + Open-WebUI (Multi-Service Container)

A wrapper script that runs vLLM and Open-WebUI in a single container:

**start.sh**

```bash
#!/usr/bin/env bash
set -euo pipefail

vllm serve deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B \
  --served-model-name R1-Qwen-1.5B \
  --port 9000 &

OPENAI_API_BASE_URL=http://127.0.0.1:9000/v1 open-webui serve --port 8000 &

wait -n
exit $?
```

**Job Definition**

```json
{
  "version": "0.1",
  "type": "container",
  "meta": {
    "trigger": "dashboard",
    "system_requirements": {
      "required_vram": 6
    }
  },
  "ops": [
    {
      "type": "container/run",
      "id": "webui-deepseek",
      "args": {
        "image": "docker.io/username/vllm-openwebui:latest",
        "gpu": true,
        "expose": [8000, 9000]
      }
    }
  ]
}
```

### vLLM + Open-WebUI (Multi-Operations)

The same setup using separate operations with dependency control:

```json
{
  "version": "0.1",
  "type": "container",
  "meta": {
    "trigger": "dashboard",
    "system_requirements": {
      "required_vram": 6
    }
  },
  "ops": [
    {
      "type": "container/run",
      "id": "vllm-server",
      "args": {
        "image": "vllm/vllm-openai:latest",
        "cmd": [
          "--model", "deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B",
          "--served-model-name", "R1-Qwen-1.5B",
          "--port", "9000"
        ],
        "gpu": true,
        "expose": [
          {
            "port": 9000,
            "health_checks": [
              {
                "type": "http",
                "path": "/v1/models",
                "method": "GET",
                "expected_status": 200,
                "continuous": true
              }
            ]
          }
        ]
      },
      "execution": {
        "group": "inference"
      }
    },
    {
      "type": "container/run",
      "id": "open-webui",
      "args": {
        "image": "ghcr.io/open-webui/open-webui:main",
        "env": {
          "OPENAI_API_BASE_URL": "http://vllm-server:9000/v1"
        },
        "expose": [8080]
      },
      "execution": {
        "group": "inference",
        "depends_on": ["vllm-server"]
      }
    }
  ]
}
```

### Multi-Stage Pipeline

A two-stage deployment with infrastructure services starting before application services:

```json
{
  "version": "0.1",
  "type": "container",
  "ops": [
    {
      "type": "container/run",
      "id": "database",
      "args": {
        "image": "postgres:15",
        "env": { "POSTGRES_DB": "app" },
        "expose": [5432]
      },
      "execution": {
        "group": "infrastructure"
      }
    },
    {
      "type": "container/run",
      "id": "redis",
      "args": {
        "image": "redis:7",
        "expose": [6379]
      },
      "execution": {
        "group": "infrastructure"
      }
    },
    {
      "type": "container/run",
      "id": "api-server",
      "args": {
        "image": "myapp/api:latest",
        "env": {
          "DATABASE_URL": "postgres://database:5432/app",
          "REDIS_URL": "redis://redis:6379"
        },
        "expose": [3000]
      },
      "execution": {
        "group": "application"
      }
    },
    {
      "type": "container/run",
      "id": "web-frontend",
      "args": {
        "image": "myapp/frontend:latest",
        "env": {
          "API_URL": "http://api-server:3000"
        },
        "expose": [80]
      },
      "execution": {
        "group": "application"
      }
    }
  ]
}
```

Execution flow:
1. **Infrastructure stage**: `database` and `redis` start in parallel
2. **Application stage**: `api-server` and `web-frontend` start after infrastructure completes