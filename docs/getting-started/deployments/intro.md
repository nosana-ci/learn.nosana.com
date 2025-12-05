---
title: Intro
next: strategies.md
---

# Deployments
To run your AI workload on the Nosana network, you'll need to create <Glossary term="Deployment">deployments</Glossary>.

## What is a deployment?
Deployments enable you to run <Glossary term="Container">containerized</Glossary> applications on the Nosana distributed computing network. Each deployment consists of:

- **Container Definition**: Specified via an JSON scheme containing the [job definition](../getting-started/job-definition/intro.md).
- **Market**: The Solana public key of the compute [market](gpu-markets.md) where the deployment runs.
- **Replicas**: The number of instances to run.
- **Strategy**: The [deployment strategy](./strategies.md) (SIMPLE, SIMPLE-EXTEND, SCHEDULED, INFINITE).
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

