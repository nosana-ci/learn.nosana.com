---
title: Options
---

# Deployment Options

Each deployment consists of:

- **Container Definition**: The [Job Definition](../job-definition/README.md).
- **GPU Market**: The Solana public key of the compute [GPU market](../gpu-markets.md) where the deployment runs.
- **Replicas**: The number of instances to run.
- **Strategy**: The deployment strategy (SIMPLE, SIMPLE-EXTEND, SCHEDULED, INFINITE).
- **Timeout**: The maximum execution time per job instance. In minutes

```json
{
  "name": "Pytorch Jupyter Notebook",
  "market": "CA5pMpqkYFKtme7K31pNB1s62X2SdhEv1nN9RdxKCpuQ", // NVIDIA 3090 
  "replicas": 1,
  "timeout": 60, // minutes
  "strategy": "SIMPLE",
  "job_definition": {...}
}
```

--- 

### Deployment Strategies
Below are the deployment strategies we currently support. 

- **SIMPLE**: Runs the specified number of replicas once. Stops when all instances complete.
- **SIMPLE-EXTEND**: Similar to SIMPLE but can be extended with additional replicas after completion.
- **SCHEDULED**: Runs deployments on a predefined schedule. 
- **INFINITE**: **(NOT YET IMPLEMENTED)** Continuously maintains the specified number of replicas, restarting instances as they complete.

When you choose for a `SCHEDULED` strategy, you will need to provide the schedule in cron format.
```json
{
  "schedule": "0 0 * * *", // daily at midnight
  "strategy": "SCHEDULED"
  ...
}
```

---

### Deployment Status

- **DRAFT**: Initial state, not yet started
- **STARTING**: Deployment is initializing
- **RUNNING**: Active and processing jobs
- **STOPPING**: Gracefully shutting down
- **STOPPED**: Stopped but can be restarted
- **ARCHIVED**: Permanently archived (cannot be restarted)
- **ERROR**: Encountered an error
- **INSUFFICIENT_FUNDS**: Not enough funds in vault to continue

---

### Full Example

Below is a full example of deployment that will spin up a Pytorch Jupyter Notebook daily at midnight.
```json
{
  "name": "Pytorch Jupyter Notebook",
  "market": "CA5pMpqkYFKtme7K31pNB1s62X2SdhEv1nN9RdxKCpuQ",
  "replicas": 1,
  "timeout": 60, // minutes
  "strategy": "SCHEDULED",
  "schedule": "0 0 * * *", // daily at midnight
  "job_definition": {
    "ops": [
      {
        "id": "Pytorch",
        "args": {
          "cmd": [
            "jupyter",
            "lab",
            "--ip=0.0.0.0",
            "--port=8888",
            "--no-browser",
            "--allow-root",
            "--ServerApp.token=''",
            "--ServerApp.password=''"
          ],
          "gpu": true,
          "image": "docker.io/nosana/pytorch-jupyter:2.0.0",
          "expose": 8888
        },
        "type": "container/run"
      }
    ],
    "meta": {
      "trigger": "dashboard",
      "system_requirements": {
        "required_vram": 4
      }
    },
    "type": "container",
    "version": "0.1"
  }
}
```