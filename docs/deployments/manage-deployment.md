---
title: Manage Deployments
---

# Manage Deployment

Learn how to manage your deployments on the Nosana network through the SDK or API.

## Prerequisites

Before managing deployments, ensure you have:

- **API Key**: A valid Nosana API key. Learn how to get one in the [API key guide](../guides/get-api-key.md).
- **SDK (Optional)**: The Nosana Typescript SDK can be installed for easier integration, though you can also make direct API requests. Install it via:
  ```bash
  npm install @nosana/sdk
  ```
  For more information, see the [SDK npm package](https://www.npmjs.com/package/@nosana/sdk).

## Initializing the SDK Client

If you're using the TypeScript SDK, initialize the client with your API key:

```ts
import { NosanaClient } from '@nosana/sdk';

// Create Nosana Client
const client = new NosanaClient({
  apiKey: process.env.NOSANA_API_KEY
});
```

## Starting a Deployment

After creating a deployment, you need to start it for it to actually execute. The deployment will remain in a draft state until you explicitly start it.

::: code-tabs

@tab TypeScript SDK

To start a deployment using the SDK, first retrieve the deployment object and then call the `start()` method:

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');
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


## Retrieving Deployments

You can retrieve a list of all your deployments or get details about a specific deployment.

::: code-tabs

@tab TypeScript SDK

List all deployments:

```ts
const deployments = await client.deployments.list();
```

Get a specific deployment:

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');
```

**Response:**

The `list()` method returns an array of deployment objects, while `get()` returns a single deployment object.

@tab cURL API

List all deployments:

```bash
curl -s \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments | jq .
```

**Response (SDK & API) Example (List):**

```json
[
  {
    "id": "7AtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHq",
    "name": "Hello World",
    "vault": "7AtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHq",
    "market": "7AtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHq",
    "owner": "7AtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHq",
    "status": "RUNNING",
    "replicas": 1,
    "timeout": 60,
    "strategy": "SIMPLE",
    "confidential": false,
    "active_revision": 1,
    "revisions": [
      {
        "revision": 1,
        "deployment": "7AtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHq",
        "ipfs_definition_hash": "QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
        },
        "created_at": "2024-01-15T10:30:00Z"
      }
    ],
    "jobs": [],
    "events": [],
    "endpoints": [],
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:35:00Z"
  },
  {
    "id": "7BtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHr",
    "name": "Another Deployment",
    "vault": "7BtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHr",
    "market": "7AtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHq",
    "owner": "7AtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHq",
    "status": "STOPPED",
    "replicas": 2,
    "timeout": 120,
    "strategy": "SIMPLE",
    "confidential": false,
    "active_revision": 1,
    "revisions": [
      {
        "revision": 1,
        "deployment": "7BtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHr",
        "ipfs_definition_hash": "QmYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
        "job_definition": {
          "version": "0.1",
          "type": "container",
          "ops": []
        },
        "created_at": "2024-01-14T09:20:00Z"
      }
    ],
    "jobs": [],
    "events": [],
    "endpoints": [],
    "created_at": "2024-01-14T09:20:00Z",
    "updated_at": "2024-01-14T15:45:00Z"
  }
]
```

Get a specific deployment:

```bash
curl -s \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments/YOUR_DEPLOYMENT_ID | jq .
```

**Response (SDK & API) Example (Get):**

```json
{
  "id": "7AtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHq",
  "name": "Hello World",
  "vault": "7AtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHq",
  "market": "7AtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHq",
  "owner": "7AtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHq",
  "status": "RUNNING",
  "replicas": 1,
  "timeout": 60,
  "strategy": "SIMPLE",
  "confidential": false,
  "active_revision": 1,
  "revisions": [
    {
      "revision": 1,
      "deployment": "7AtiXMSH6R1jjBxrcYjehCkkSF7zvYWte63gwEDBcGHq",
      "ipfs_definition_hash": "QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
      },
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "jobs": [],
  "events": [],
  "endpoints": [],
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:35:00Z"
}
```

:::

## Stopping a Deployment

You can stop a running deployment to halt its execution. This is useful when you need to pause a deployment temporarily.

::: code-tabs

@tab TypeScript SDK

To stop a deployment using the SDK, retrieve the deployment object and call the `stop()` method:

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');
await deployment.stop();
```

**Response:**

The `stop()` method returns an object with `status` set to `"STOPPING"` and `updated_at` timestamp.

@tab cURL API

To stop a deployment using the API, make a request to the stop endpoint:

```bash
curl -s \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments/<deployment_id>/stop | jq .
```

Replace `<deployment_id>` with your deployment ID.

**Response (SDK & API) Example:**

```json
{
  "status": "STOPPING",
  "updated_at": "2024-01-15T11:00:00Z"
}
```

:::

## Archiving a Deployment

You can archive a deployment to remove it from your active deployments list. Archived deployments are retained for historical purposes.

::: code-tabs

@tab TypeScript SDK

To archive a deployment using the SDK, retrieve the deployment object and call the `archive()` method:

```ts
const deployment = await client.deployments.get('YOUR_DEPLOYMENT_ID');
await deployment.archive();
```

**Response:**

The `archive()` method returns an object with `status` set to `"ARCHIVED"` and `updated_at` timestamp.

@tab cURL API

To archive a deployment using the API, make a request to the archive endpoint:

```bash
curl -s \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments/<deployment_id>/archive | jq .
```

Replace `<deployment_id>` with your deployment ID.

**Response (SDK & API) Example:**

```json
{
  "status": "ARCHIVED",
  "updated_at": "2024-01-15T11:30:00Z"
}
```

:::

## Additional Operations

For all available deployment endpoints and operations, see the [API reference](https://dashboard.k8s.prd.nos.ci/api/swagger).