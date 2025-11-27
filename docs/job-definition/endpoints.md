---
title: Endpoints
---

# Endpoints

Setting Up and Communicating with Endpoints on the Nosana Network

When creating a deployment on the Nosana network, you can expose services that will be accessible via endpoints. This means an instance will be accessible via an endpoint with which you can communicate.

This guide will walk you through setting up an Nginx server and interacting with its endpoint. Afterwards, we will set up a Llama instance and start communicating with it.

## Proof of concept: Nginx

Nginx is a high-performance web server and reverse proxy server that is widely used for serving static content, load balancing, and handling HTTP and HTTPS traffic.
It'll be a good proof of concept to showcase how to use a Nosana endpoint.

### Setting Up an Nginx Server

#### Step 1: Create a Deployment

First, create a deployment with a job definition that exposes port 80 for Nginx.

::: code-tabs

@tab TypeScript SDK

```ts
const deployment = await client.deployments.create({
  name: 'Nginx Server',
  market: '97G9NnvBDQ2WpKu6fasoMsAKmfj63C9rhysJnkeWodAf', // NVIDIA 4090
  timeout: 60, // 60 minutes
  replicas: 1,
  strategy: 'SIMPLE',
  job_definition: {
    "version": "0.1",
    "type": "container",
    "meta": {
      "trigger": "api"
    },
    "ops": [
      {
        "type": "container/run",
        "id": "nginx",
        "args": {
          "cmd": [],
          "image": "nginx",
          "expose": 80
        }
      }
    ]
  }
});

const deploymentId = deployment.id;
console.log('Created deployment:', deploymentId);
```

@tab cURL API

```bash
curl -X POST "https://dashboard.k8s.prd.nos.ci/api/deployments/create" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  -d '{
    "name": "Nginx Server",
    "market": "97G9NnvBDQ2WpKu6fasoMsAKmfj63C9rhysJnkeWodAf",
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
          "id": "nginx",
          "args": {
            "cmd": [],
            "image": "nginx",
            "expose": 80
          }
        }
      ]
    }
  }'
```

:::

#### Step 2: Start the Deployment

After creating the deployment, you need to start it for it to actually execute.

::: code-tabs

@tab TypeScript SDK

```ts
// Get the deployment and start it
const deployment = await client.deployments.get(deploymentId);
await deployment.start();
```

@tab cURL API

```bash
curl -X POST \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments/<deployment_id>/start
```

Replace `<deployment_id>` with the actual deployment ID returned when you created the deployment.

:::

#### Step 3: Retrieve the Deployment

Once the deployment is running, retrieve it to get the endpoints. The deployment object includes an `endpoints` array with the service URLs.

::: code-tabs

@tab TypeScript SDK

```ts
// Retrieve the deployment to get endpoints
const deployment = await client.deployments.get(deploymentId);
```

@tab cURL API

```bash
curl -s \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments/<deployment_id> | jq .
```

Replace `<deployment_id>` with your deployment ID.

**Example Response:**

The deployment response includes an `endpoints` array:

```json
{
  "id": "...",
  "name": "Nginx Server",
  "status": "RUNNING",
  "endpoints": [
    {
      "opId": "nginx",
      "port": 80,
      "url": "https://5iTE1eMDHubmfqdoGMuBVMLSUpXVX4Wike3EW23D8XwZ.node.k8s.prd.nos.ci"
    }
  ]
}
```

:::

#### Step 4: Access the Service Endpoint

The deployment object contains the service URLs in the `endpoints` field. You can now access your Nginx service at this URL.

::: code-tabs

@tab TypeScript SDK

```ts
// Access the service endpoint from the deployment
const serviceUrl = deployment.endpoints[0]?.url;
console.log('Service available at:', serviceUrl);
```

@tab cURL API

```bash
# First, retrieve the deployment to get the endpoint URL
DEPLOYMENT_RESPONSE=$(curl -s \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments/<deployment_id>)

# Extract the service URL from the endpoints array
SERVICE_URL=$(echo $DEPLOYMENT_RESPONSE | jq -r '.endpoints[0].url')
```

Replace `<deployment_id>` with your deployment ID. The service URL will be extracted from the `endpoints` array in the deployment response.

:::

::: info
The service endpoint URL will be in the format:
`https://<id>.node.k8s.prd.nos.ci`

You can find this URL in the `endpoints` array of the deployment object. Each endpoint includes:
- `opId`: The operation ID from your job definition
- `port`: The exposed port number
- `url`: The full service URL
:::

Navigate to the service URL to find your Nginx service.

Success! Your Nginx instance is running on the Nosana Network.

