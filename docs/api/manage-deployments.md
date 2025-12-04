---
title: Manage Deployments
---

# Manage Deployments

Use the Nosana REST API to list, inspect, stop, and archive deployments.

## Prerequisites

- **<Glossary term="API Key">API Key</Glossary>**: See the [API key guide](../guides/get-api-key.md).
- **Existing deployments**: Created via the API or dashboard.

All examples assume:

```bash
export NOSANA_API_KEY="nos_xxx_your_api_key"
```

and include:

```bash
-H "Authorization: Bearer $NOSANA_API_KEY"
```

## List Deployments

```bash
curl -s \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments | jq .
```

## Get a Deployment

```bash
curl -s \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments/YOUR_DEPLOYMENT_ID | jq .
```

## Update Job Definition (Create a Revision)

Create a new revision of the job definition for an existing deployment:

```bash
curl -s \
  -X POST \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  -H "Content-Type: application/json" \
  -d @job-definition.json \
  https://dashboard.k8s.prd.nos.ci/api/deployments/YOUR_DEPLOYMENT_ID/revisions | jq .
```

The body should contain a `job_definition` matching the structure described in the job definition docs.

## Update Replica Count

```bash
curl -s \
  -X PATCH \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"replicas": 3}' \
  https://dashboard.k8s.prd.nos.ci/api/deployments/YOUR_DEPLOYMENT_ID/update-replicas | jq .
```

## Update Schedule (SCHEDULED Strategy Only)

```bash
curl -s \
  -X PATCH \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"schedule": "0 0 * * *"}' \
  https://dashboard.k8s.prd.nos.ci/api/deployments/YOUR_DEPLOYMENT_ID/update-schedule | jq .
```

This only applies to deployments using the `SCHEDULED` strategy. See **[Deployment Strategies](../deployments/strategies.md)** for cron examples.

## Update Timeout

```bash
curl -s \
  -X PATCH \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"timeout": 120}' \
  https://dashboard.k8s.prd.nos.ci/api/deployments/YOUR_DEPLOYMENT_ID/update-timeout | jq .
```

## Start a Deployment

Start an existing deployment that is in a draft or stopped state:

```bash
curl -s \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments/YOUR_DEPLOYMENT_ID/start | jq .
```

## Stop a Deployment

Stop a running deployment:

```bash
curl -s \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments/<deployment_id>/stop | jq .
```

The response will contain a `status` (for example `"STOPPING"`) and an `updated_at` timestamp.

## Archive a Deployment

Archive a deployment to remove it from your active list while keeping history:

```bash
curl -s \
  -H "Authorization: Bearer $NOSANA_API_KEY" \
  https://dashboard.k8s.prd.nos.ci/api/deployments/<deployment_id>/archive | jq .
```

The response will include `status: "ARCHIVED"` when successful.

## Full API Reference

For all deployment endpoints and fields, consult the **[API Swagger reference](https://dashboard.k8s.prd.nos.ci/api/swagger)**.


