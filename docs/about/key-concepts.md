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

<p><Glossary term="Host">Hosts</Glossary> are the individual computers that actually run jobs. Each host belongs to a specific GPU Market that matches the hardware they offer.</p>

## Nosana APIs

You can interact with Nosana APIs directly using HTTP calls to the supplied REST endpoints, or via the **TypeScript <Glossary term="SDK">SDK</Glossary>** libraries.
