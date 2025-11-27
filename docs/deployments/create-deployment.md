---
title: Create a Deployment
---

# Create a Deployment

Learn how to create a new deployment using the Nosana SDK or API.

## Prerequisites

Before creating deployments, ensure you have:

- **API Key**: A valid Nosana API key. Learn how to get one in the [API key guide](../guides/get-api-key.md).
- **Credit Balance**: Sufficient credit balance on your Nosana account to run deployments.
- **SDK (Optional)**: The Nosana Typescript SDK can be installed for easier integration, though you can also make direct API requests. Install it via:
  ```bash
  npm install @nosana/sdk
  ```
  For more information, see the [SDK npm package](https://www.npmjs.com/package/@nosana/sdk).

## Creating a Deployment

You can create deployments using either the Nosana SDK (TypeScript) or by making direct API calls. Both methods require your API key and follow the same deployment structure.

The deployment creation process involves specifying:
- A unique name for your deployment
- The target market (GPU market address)
- Deployment configuration (timeout, replicas, strategy)
- Job definition (container image, commands, and operations)

::: code-tabs

@tab TypeScript SDK

The TypeScript SDK provides a convenient way to create deployments programmatically. First, ensure you have the SDK installed and initialized with your API key:

```ts
import { NosanaClient } from '@nosana/sdk';

// Create Nosana Client
const client = new NosanaClient({
  apiKey: process.env.NOSANA_API_KEY
});

const deployment = await client.deployments.create({
  name: 'Hello World',
  market: '7AtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHq',
  timeout: 60, // 60 minutes
  replicas: 1,
  strategy: 'SIMPLE',
  job_definition: {
    "version": "0.1",
    "type": "container",
    "meta": {
      "trigger": "cli"
    },
    "ops": [
      {
        "type": "container/run",
        "id": "hello-world",
        "args": {
          "cmd": "for i in `seq 1 30`; do echo $i; sleep 1; done",
          "image": "ubuntu"
        }
      }
    ]
  }
});

console.log('Created deployment:', deployment.id);
```

@tab cURL API

You can also create deployments directly using the REST API with curl. This is useful for shell scripts or when you prefer not to use the SDK:

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
        "trigger": "cli"
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

:::

For detailed information about all available deployment options, see the [deployment options](./options.md) documentation.

You can find the available GPU markets in the [Nosana Dashboard](https://dashboard.nosana.com/markets)

## Starting the Deployment

After creating a deployment, you need to start it for it to actually execute. The deployment will remain in a draft state until you explicitly start it.

::: code-tabs

@tab TypeScript SDK

To start a deployment using the SDK, first retrieve the deployment object and then call the `start()` method:

```ts
const deployment = await client.deployments.get(deployment.id);
await deployment.start();
```

@tab cURL API

To start a deployment using the API, make a request to the start endpoint with your deployment ID:

```bash
curl -s \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments/<deployment_id>/start | jq .
```

Replace `<deployment_id>` with the actual deployment ID returned when you created the deployment.

:::

## Next Steps

- [Manage Deployment](./manage-deployment.md)

