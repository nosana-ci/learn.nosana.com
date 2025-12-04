---
title: Create Deployments
---

# Create Deployments

Use the Nosana TypeScript <Glossary term="SDK">SDK</Glossary> to programmatically create and start deployments.

## Prerequisites

Before creating deployments, ensure you have:

- **SDK installed**: See the [SDK intro](./intro.md).
- **<Glossary term="API Key">API Key</Glossary>**: Available as an environment variable (`NOSANA_API_KEY` recommended).
- **Credit Balance**: Sufficient <Glossary term="Credits">credit balance</Glossary> on your Nosana account.
- **<Glossary term="Job Definition">Job Definition</Glossary>**: A valid [job definition](../job-definition/intro.md).

## What you configure

When creating a deployment, you specify:

- A unique **name** for your deployment
- The target **market** (GPU market address)
- Deployment configuration: **timeout**, **replicas**, **strategy**
- The **job definition** (container image, commands, operations)

For all available fields, see **[Deployment Options](../deployments/options.md)**. You can find GPU markets **[here](../gpu-markets.md)**.

## Create a Deployment

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

## Start the Deployment

After creation, start the deployment so it actually runs:

```ts
async function startDeployment(id: string) {
  const deployment = await client.deployments.get(id);
  await deployment.start();
}
```
