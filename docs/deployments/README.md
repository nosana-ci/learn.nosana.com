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

## Topics

- [Create a Deployment](./create-deployment.md) - Learn how to create a new deployment
- [Manage Deployment](./manage-deployment.md) - Learn how to manage existing deployments

