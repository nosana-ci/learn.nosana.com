---
title: Strategies
---

# Deployment Strategies

Below are the deployment strategies we currently support.

- **SIMPLE**: Runs the specified number of replicas once. Stops when all instances complete.
- **SIMPLE-EXTEND**: Similar to SIMPLE but can be extended with additional replicas after completion.
- **SCHEDULED**: Runs deployments on a predefined schedule.
- **INFINITE**: **(NOT YET IMPLEMENTED)** Continuously maintains the specified number of replicas, restarting instances as they complete.

When you choose the `SCHEDULED` strategy, you need to provide the schedule in cron format:

```json
{
  "schedule": "0 0 * * *", // daily at midnight
  "strategy": "SCHEDULED",
  ...
}
```


