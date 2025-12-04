---
title: Key Concepts
---

# Key Concepts

## Deployments

<p><Glossary term="Deployment">Deployments</Glossary> are long-lived objects that describe what to run and where/how to run it (market, strategy, replicas, timeout). Over its lifetime, a deployment will create jobs from your job definition according to its strategy.</p>

- Learn more in **[Deployments Intro](../deployments/intro.md)**.
- See configuration details in **[Deployment Options](../deployments/options.md)**.

## Jobs

Jobs are the concrete executions created by a deployment from your job definition. A single deployment can create one or many jobs over its lifetime, depending on its strategy and replica settings.

Each job runs the specified container image with the configured resources and commands, and transitions through states such as pending, running, and completed/failed.

## Job Definition

The <Glossary term="Job Definition">job definition</Glossary> is a JSON specification that describes the container image, commands, and runtime requirements for your workload. Deployments reference a job definition to know exactly what each job should run when it is scheduled onto a host.

- Start with **[Job Definition Intro](../job-definition/intro.md)**.
- Explore schemas and examples in the Job Definition section.

## GPU Markets

<p><Glossary term="GPU Market">GPU Markets</Glossary> represent pools of GPU resources where your deployments are scheduled.</p>

- See **[GPU Markets](../gpu-markets.md)** for available markets.

## Hosts

<p><Glossary term="Host">Hosts</Glossary> are the individual GPU machines that actually run your jobs. Each host belongs to a specific GPU Market, and are matched onto suitable hosts in the selected market based on their resource requirements.</p>

## Access Methods: API and SDK

You can interact with Nosana via:

- **HTTP API** – Direct REST calls; see **[API Intro](../api/intro.md)**.
- **TypeScript <Glossary term="SDK">SDK</Glossary>** – Higher-level client library; see **[TypeScript SDK Intro](../sdk/intro.md)**.


