---
title: Manage Deployments
---

# Manage Deployments

Use the Nosana TypeScript SDK to list, inspect, stop, and archive deployments.

## Prerequisites

- **SDK initialized**: See the [SDK intro](./intro.md).
- **Existing deployments**: Created via the SDK, API, or dashboard.

```ts
import { NosanaClient } from '@nosana/sdk';

const client = new NosanaClient({
  apiKey: process.env.NOSANA_API_KEY as string,
});
```

## List Deployments

```ts
const deployments = await client.deployments.list();
```

## Get a Deployment

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');
```

## Update Job Definition (Create a Revision)

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');

const revision = await deployment.createRevision({
  job_definition: {
    // New job definition fields go here
  },
});
```

## Update Replica Count

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');
await deployment.updateReplicas(3);
```

## Update Schedule (SCHEDULED Strategy Only)

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');
await deployment.updateSchedule('0 0 * * *'); // daily at midnight
```

> **Note**: The schedule only applies to deployments using the `SCHEDULED` strategy.  
> For cron syntax examples, see **[Deployment Strategies](../deployments/strategies.md)**.

## Update Timeout

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');
await deployment.updateTimeout(120); // minutes
```

## Start a Deployment

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');
await deployment.start();
```

## Stop a Deployment

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');
await deployment.stop();
```

## Archive a Deployment

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');
await deployment.archive();
```

## Pipe Multiple Deployment Operations

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


