---
title: Deployments
---

# Deployments
To run your AI workload on the Nosana network, you'll need to create deployments.

## What is a deployment?
Deployments enable you to run containerized applications on the Nosana distributed computing network. Each deployment consists of:

- **Container Definition**: Specified via an IPFS hash containing the [job definition](../job-definition/README.md).
- **Market**: The Solana public key of the compute [market](../gpu-markets.md) where the deployment runs.
- **Replicas**: The number of instances to run.
- **Strategy**: The deployment strategy (SIMPLE, SIMPLE-EXTEND, SCHEDULED, INFINITE).
- **Timeout**: The maximum execution time per job instance.

For all available options when creating a deployment, see the [deployment options](./options.md) documentation.

## Deployment Status

- **DRAFT**: Initial state, not yet started
- **STARTING**: Deployment is initializing
- **RUNNING**: Active and processing jobs
- **STOPPING**: Gracefully shutting down
- **STOPPED**: Stopped but can be restarted
- **ARCHIVED**: Permanently archived (cannot be restarted)
- **ERROR**: Encountered an error
- **INSUFFICIENT_FUNDS**: Not enough funds in vault to continue

## Prerequisites

Before creating and managing deployments, ensure you have:

- **API Key**: A valid Nosana API key. Learn how to get one in the [API key guide](../guides/get-api-key.md).
- **Credit Balance**: Sufficient credit balance on your Nosana account to run deployments.
- **SDK (Optional)**: The Nosana Typescript SDK can be installed for easier integration, though you can also make direct API requests. Install it via:
  ```bash
  npm install @nosana/sdk
  ```
  For more information, see the [SDK npm package](https://www.npmjs.com/package/@nosana/sdk).

