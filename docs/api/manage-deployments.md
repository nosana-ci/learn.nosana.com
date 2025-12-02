---
title: Manage Deployments
---

# Manage Deployments

Use the Nosana REST API to list, inspect, stop, and archive deployments.

## Prerequisites

- **API Key**: See the [API key guide](../guides/get-api-key.md).
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


