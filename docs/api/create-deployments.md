---
title: Create Deployments
---

# Create Deployments

Learn how to create a new <Glossary term="Deployment">deployment</Glossary> using either the Nosana HTTP API or the TypeScript SDK.

## Prerequisites

Before creating deployments, ensure you have:

- **<Glossary term="API Key">API Key</Glossary>**: A valid Nosana API key. See the [API key guide](../guides/get-api-key.md).
- **Credit Balance**: Sufficient <Glossary term="Credits">credit balance</Glossary> on your Nosana account to run deployments.
- **<Glossary term="Job Definition">Job Definition</Glossary>**: A valid [job definition](../getting-started/job-definition/intro.md) describing the container workload.

## What you configure

When creating a deployment, you specify:

- A unique **name** for your deployment
- The target **market** (GPU market address)
- Deployment configuration: **timeout**, **replicas**, **strategy**
- The **job definition** (container image, commands, operations)

For all available fields, see **[Deployment Options](../getting-started/deployments/options.md)**. You can find GPU markets **[here](../getting-started/deployments/gpu-markets.md)**.

## Create a Deployment

:::: code-tabs

@tab TypeScript SDK

```ts
import { NosanaClient } from '@nosana/sdk';

const client = new NosanaClient({
  apiKey: process.env.NOSANA_API_KEY as string,
});

async function createDeployment() {
  const deployment = await client.deployments.create({
    name: 'Hello World',
    market: '7AtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHq',
    timeout: 60, // minutes
    replicas: 1,
    strategy: 'SIMPLE',
    job_definition: {
      version: '0.1',
      type: 'container',
      meta: {
        trigger: 'api',
      },
      ops: [
        {
          type: 'container/run',
          id: 'hello-world',
          args: {
            cmd: 'for i in `seq 1 30`; do echo $i; sleep 1; done',
            image: 'ubuntu',
          },
        },
      ],
    },
  });
}
```

@tab HTTP API

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

::::

The response contains the created deployment, including its `id`, which you will need to start or manage it.

## Start a Deployment

New deployments are created in a **draft** state and must be explicitly started:

:::: code-tabs

@tab TypeScript SDK

```ts
async function startDeployment(id: string) {
  const deployment = await client.deployments.get(id);
  await deployment.start();
}
```

@tab HTTP API

```bash
curl -s \
  -X POST \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments/<deployment_id>/start | jq .
```

::::

Replace `<deployment_id>` with the `id` returned from the create call.
