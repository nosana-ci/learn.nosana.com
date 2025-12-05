---
title: Manage Deployments
---

# Manage Deployments

Use the Nosana REST API or TypeScript SDK to list, inspect, stop, and archive deployments.

## Prerequisites

- **<Glossary term="API Key">API Key</Glossary>**: See the [API key guide](../guides/get-api-key.md).
- **Existing deployments**: Created via the API, SDK, or dashboard.

All examples assume you have your API key set up. For the SDK, initialize the client:

```ts
import { NosanaClient } from '@nosana/sdk';

const client = new NosanaClient({
  apiKey: process.env.NOSANA_API_KEY as string,
});
```

For the API, set your API key:

```bash
export NOSANA_API_KEY="nos_xxx_your_api_key"
```

## List Deployments

::: code-tabs

@tab TypeScript SDK

```ts
const deployments = await client.deployments.list();
```

@tab HTTP API

```bash
curl -s \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments | jq .
```

:::

## Get a Deployment

::: code-tabs

@tab TypeScript SDK

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');
```

@tab HTTP API

```bash
curl -s \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments/YOUR_DEPLOYMENT_ID | jq .
```

:::

## Update Job Definition (Create a Revision)

Create a new revision of the job definition for an existing deployment:

::: code-tabs

@tab TypeScript SDK

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');

const revision = await deployment.createRevision({
  job_definition: {
    // New job definition fields go here
  },
});
```

@tab HTTP API

```bash
curl -s \
  -X POST \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  -H "Content-Type: application/json" \
  -d @job-definition.json \
  https://dashboard.k8s.prd.nos.ci/api/deployments/YOUR_DEPLOYMENT_ID/revisions | jq .
```

:::

The body should contain a `job_definition` matching the structure described in the job definition docs.

## Update Replica Count

::: code-tabs

@tab TypeScript SDK

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');
await deployment.updateReplicas(3);
```

@tab HTTP API

```bash
curl -s \
  -X PATCH \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"replicas": 3}' \
  https://dashboard.k8s.prd.nos.ci/api/deployments/YOUR_DEPLOYMENT_ID/update-replicas | jq .
```

:::

## Update Schedule (SCHEDULED Strategy Only)

::: code-tabs

@tab TypeScript SDK

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');
await deployment.updateSchedule('0 0 * * *'); // daily at midnight
```

@tab HTTP API

```bash
curl -s \
  -X PATCH \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"schedule": "0 0 * * *"}' \
  https://dashboard.k8s.prd.nos.ci/api/deployments/YOUR_DEPLOYMENT_ID/update-schedule | jq .
```

:::

> **Note**: The schedule only applies to deployments using the `SCHEDULED` strategy.  
> For cron syntax examples, see **[Deployment Strategies](../getting-started/deployments/strategies.md)**.

## Update Timeout

::: code-tabs

@tab TypeScript SDK

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');
await deployment.updateTimeout(120); // minutes
```

@tab HTTP API

```bash
curl -s \
  -X PATCH \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"timeout": 120}' \
  https://dashboard.k8s.prd.nos.ci/api/deployments/YOUR_DEPLOYMENT_ID/update-timeout | jq .
```

:::

## Start a Deployment

Start an existing deployment that is in a draft or stopped state:

::: code-tabs

@tab TypeScript SDK

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');
await deployment.start();
```

@tab HTTP API

```bash
curl -s \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments/YOUR_DEPLOYMENT_ID/start | jq .
```

:::

## Stop a Deployment

Stop a running deployment:

::: code-tabs

@tab TypeScript SDK

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');
await deployment.stop();
```

@tab HTTP API

```bash
curl -s \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments/<deployment_id>/stop | jq .
```

:::

The response will contain a `status` (for example `"STOPPING"`) and an `updated_at` timestamp.

## Archive a Deployment

Archive a deployment to remove it from your active list while keeping history:

::: code-tabs

@tab TypeScript SDK

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');
await deployment.archive();
```

@tab HTTP API

```bash
curl -s \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments/<deployment_id>/archive | jq .
```

:::

The response will include `status: "ARCHIVED"` when successful.

## Pipe Multiple Deployment Operations (SDK Only)

The pipe function allows you to chain multiple actions on a deployment in a functional programming style. It can either create a new deployment or operate on an existing one.

```ts
// Create and execute multiple actions in sequence
const deployment = await client.deployments.pipe(
  {
    name: 'My Application',
    market: '7AtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHq',
    replicas: 3,
    timeout: 300,
    strategy: 'SIMPLE',
    job_definition: {},
  },
  async (deployment) => {
    console.log('Starting deployment');
    await deployment.start();
  },
  async (deployment) => {
    console.log('Updating replicas');
    await deployment.updateReplicas(5);
  },
);

// Or operate on an existing deployment
const deployment = await client.deployments.pipe(
  'existing-deployment-id',
  async (deployment) => {
    await deployment.start();
  },
  async (deployment) => {
    await deployment.stop();
  }
);
```

This example gets a deployment, updates its replica count and timeout, and then starts it in one composed call.

## Full API Reference

For all deployment endpoints and fields, consult the **[API Swagger reference](https://dashboard.k8s.prd.nos.ci/api/swagger)**.

