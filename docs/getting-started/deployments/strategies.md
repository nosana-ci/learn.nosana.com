---
title: Strategies
---

# Deployment Strategies

Below are the deployment strategies we currently support.

- **SIMPLE**: Runs the specified number of replicas once. Stops when all instances complete.
- **SIMPLE-EXTEND**: Similar to SIMPLE but can be extended with additional replicas after completion.
- **SCHEDULED**: Runs deployments on a predefined schedule.
- **INFINITE**: **(COMING SOON)** Continuously maintains the specified number of replicas, restarting instances as they complete.

When you choose the `SCHEDULED` strategy, you need to provide the schedule in cron format:

```json
{
  "schedule": "0 0 * * *", // daily at midnight
  "strategy": "SCHEDULED",
  ...
}
```

The cron expression has five space‑separated fields:  

- **minute** (0–59)  
- **hour** (0–23)  
- **day of month** (1–31)  
- **month** (1–12)  
- **day of week** (0–6, where 0 is Sunday)

Some common examples for `schedule` are:

- `"*/5 * * * *"` – run every 5 minutes
- `"0 * * * *"` – run at the start of every hour
- `"0 9 * * 1-5"` – run at 09:00 on weekdays (Monday–Friday)

You can experiment with and validate your cron expressions using tools like [`crontab.guru`](https://crontab.guru/).
