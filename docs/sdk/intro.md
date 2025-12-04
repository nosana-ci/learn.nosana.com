---
title: TypeScript SDK Intro
---

# TypeScript SDK

The Nosana TypeScript <Glossary term="SDK">SDK</Glossary> provides a convenient, typed interface for creating and managing deployments from Node.js or browser environments.

## Prerequisites

Before using the SDK, ensure you have:

- **<Glossary term="API Key">API Key</Glossary>**: A valid Nosana API key. See the [API key guide](../guides/get-api-key.md).
- **<Glossary term="Credits">Credits</Glossary>**: Sufficient credits in your Nosana account to run deployments.
- **Node.js**: A recent LTS version of Node.js is recommended.

## Installation

Install the SDK from npm:

```bash
npm install @nosana/sdk
```

Or with `yarn`:

```bash
yarn add @nosana/sdk
```

You can find the package on npm at: https://www.npmjs.com/package/@nosana/sdk

## Initializing the Client

```ts
import { NosanaClient } from '@nosana/sdk';

const client = new NosanaClient({
  apiKey: process.env.NOSANA_API_KEY as string,
});
```

## Next Steps

- **[Create Deployments with the SDK](./create-deployments.md)**
- **[Manage Deployments with the SDK](./manage-deployments.md)**


