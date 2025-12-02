---
title: Create Deployments
---

# Create Deployments

Learn how to create a new deployment using the Nosana HTTP API.

## Prerequisites

Before creating deployments, ensure you have:

- **API Key**: A valid Nosana API key. See the [API key guide](../guides/get-api-key.md).
- **Credit Balance**: Sufficient credit balance on your Nosana account to run deployments.
- **Job Definition**: A valid [job definition](../job-definition/intro.md) describing the container workload.

## What you configure

When creating a deployment, you specify:

- A unique **name** for your deployment
- The target **market** (GPU market address)
- Deployment configuration: **timeout**, **replicas**, **strategy**
- The **job definition** (container image, commands, operations)

For all available fields, see **[Deployment Options](../deployments/options.md)**. You can find GPU markets **[here](../gpu-markets.md)**.

## Create a Deployment

Create a deployment with a `POST` request to the `deployments/create` endpoint:

```bash
export NOSANA_API_KEY="nos_xxx_your_api_key"

curl -X POST "https://dashboard.k8s.prd.nos.ci/api/deployments/create" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  -d '{
    "name": "Hello World",
    "market": "7AtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHq",
    "timeout": 60,
    "replicas": 1,
    "strategy": "SIMPLE",
    "job_definition": {
      "version": "0.1",
      "type": "container",
      "meta": {
        "trigger": "api"
      },
      "ops": [
        {
          "type": "container/run",
          "id": "hello-world",
          "args": {
            "cmd": ["echo hello world"],
            "image": "ubuntu"
          }
        }
      ]
    }
  }'
```

The response contains the created deployment, including its `id`, which you will need to start or manage it.

## Start a Deployment

New deployments are created in a **draft** state and must be explicitly started:

```bash
curl -s \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments/<deployment_id>/start | jq .
```

Replace `<deployment_id>` with the `id` returned from the create call.