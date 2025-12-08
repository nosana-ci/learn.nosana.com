---
title: Key Concepts
---

# Key Concepts

## Jobs

<p>Jobs are the concrete set of operations to be executed. A job lists the operations to be executed, their order, whether they need to be executed sequentially or in parallel, and how input and output are passed around between them. Operations are executed as containers and offer similar ability to integrate with storage, networking, and resources like CPU and memory.</p>

The <Glossary term="Job Definition">job definition</Glossary> is a JSON specification that describes the container image, commands, and runtime requirements for each workload.

- Start with **[Job Definition Intro](../getting-started/job-definition/intro.md)**.
- Explore schemas and examples in the Job Definition section.

## Deployments

<p><Glossary term="Deployment">Deployments</Glossary> are an orchestration layer on top of jobs. Through deployments, user can pick different strategies for how the underlying job lifecycles should be managed, for example, whether a job should run indefinitely is a possible strategy.</p>

- Learn more in **[Deployments Intro](../getting-started/deployments/intro.md)**.
- See configuration details in **[Deployment Options](../getting-started/deployments/options.md)**.

## GPU Markets

<p><Glossary term="GPU Market">GPU Markets</Glossary> represent pools of GPU resources where jobs are scheduled.</p>

- See **[GPU Markets](../getting-started/deployments/gpu-markets.md)** for available markets.

## Hosts

<p><Glossary term="Host">Hosts</Glossary> are the individual GPU machines that actually run your jobs. Each host belongs to a specific GPU Market, and are matched onto suitable hosts in the selected market based on their resource requirements.</p>

## Access Methods: API and SDK

You can interact with Nosana via:

- **HTTP API** – Direct REST calls.
- **TypeScript <Glossary term="SDK">SDK</Glossary>** – Higher-level client library.
