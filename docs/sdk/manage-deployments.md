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
async function listDeployments() {
  const deployments = await client.deployments.list();
  console.log(deployments);
}
```

## Get a Deployment

```ts
async function getDeployment(id: string) {
  const deployment = await client.deployments.get(id);
  console.log(deployment);
}
```

## Stop a Deployment

```ts
async function stopDeployment(id: string) {
  const deployment = await client.deployments.get(id);
  await deployment.stop();
}
```

## Archive a Deployment

```ts
async function archiveDeployment(id: string) {
  const deployment = await client.deployments.get(id);
  await deployment.archive();
}
```

## Additional Operations

For all deployment fields and options, see **[Deployment Options](../deployments/options.md)**.


