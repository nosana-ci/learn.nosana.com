---
title: Intro
---

# API & TypeScript SDK

Nosana exposes both a REST HTTP API and a typed TypeScript SDK so you can create and manage deployments from whatever environment fits your workflow.

## HTTP API

Use the Nosana HTTP API to create and manage deployments from any language or environment that can make HTTPS requests.

### Prerequisites

Before calling the API, ensure you have:

- **<Glossary term="API Key">API key</Glossary>**: A valid Nosana API key. See the [API key guide](../guides/get-api-key.md).
- **<Glossary term="Credits">Credits</Glossary>**: Sufficient credit balance on your Nosana account to run deployments.
- **Base URL**: The current production API base URL:

```bash
https://dashboard.k8s.prd.nos.ci/api
```

### Authentication

All requests must include your API key as a Bearer token:

```bash
curl -H "Authorization: Bearer nos_xxx_your_api_key" ...
```

If you are using environment variables:

```bash
export NOSANA_API_KEY="nos_xxx_your_api_key"

curl -H "Authorization: Bearer $NOSANA_API_KEY" ...
```

### API Reference (Swagger)

You can explore all available endpoints and schemas in the interactive Swagger UI:

- **Swagger UI**: https://dashboard.k8s.prd.nos.ci/api/swagger

Use this reference to:

- Inspect request/response payloads
- Try out endpoints directly in the browser
- Generate or validate client code

## TypeScript SDK

The Nosana TypeScript <Glossary term="SDK">SDK</Glossary> provides a convenient, typed interface for creating and managing deployments from Node.js or browser environments.

### Prerequisites

Before using the SDK, ensure you have:

- **<Glossary term="API Key">API Key</Glossary>**: A valid Nosana API key. See the [API key guide](../guides/get-api-key.md).
- **<Glossary term="Credits">Credits</Glossary>**: Sufficient credits in your Nosana account to run deployments.
- **Node.js**: A recent LTS version of Node.js is recommended.

:::: info
If you want to create deployments directly with your Solana wallet, see the [TypeScript SDK deployments service](https://gitlab.com/nosana-ci/tools/sdk/typescript/-/tree/main/src/services/deployments?ref_type=heads).
::::

### Installation

Install the SDK from npm:

```bash
npm install @nosana/sdk
```

Or with `yarn`:

```bash
yarn add @nosana/sdk
```

You can find the package on npm at: https://www.npmjs.com/package/@nosana/sdk

### Initializing the Client

```ts
import { NosanaClient } from '@nosana/sdk';

const client = new NosanaClient({
  apiKey: process.env.NOSANA_API_KEY as string,
});
```

## Next Steps

- **API**:
  - **[Create Deployments](./create-deployments.md)**
  - **[Manage Deployments](./manage-deployments.md)**
