---
title: API Intro
---

# API

Use the Nosana HTTP API to create and manage deployments from any language or environment that can make HTTPS requests.

## Prerequisites

Before calling the API, ensure you have:

- **<Glossary term="API Key">API key</Glossary>**: A valid Nosana API key. See the [API key guide](../guides/get-api-key.md).
- **<Glossary term="Credits">Credits</Glossary>**: Sufficient credit balance on your Nosana account to run deployments.
- **Base URL**: The current production API base URL:

```bash
https://dashboard.k8s.prd.nos.ci/api
```

## Authentication

All requests must include your API key as a Bearer token:

```bash
curl -H "Authorization: Bearer nos_xxx_your_api_key" ...
```

If you are using environment variables:

```bash
export NOSANA_API_KEY="nos_xxx_your_api_key"

curl -H "Authorization: Bearer $NOSANA_API_KEY" ...
```

## API Reference (Swagger)

You can explore all available endpoints and schemas in the interactive Swagger UI:

- **Swagger UI**: https://dashboard.k8s.prd.nos.ci/api/swagger

Use this reference to:

- Inspect request/response payloads
- Try out endpoints directly in the browser
- Generate or validate client code

## Next Steps

- **[Create Deployments via API](./create-deployments.md)**
- **[Manage Deployments via API](./manage-deployments.md)**


