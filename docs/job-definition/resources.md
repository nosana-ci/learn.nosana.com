---
title: Resources
---

Nosana Nodes can cache resources they need to run a job. This is useful, because the main bottle neck to spinning up a job is downloading the assets to start the job like docker images and model files.

You can use the `resources` property of the Nosana Job Definition by defining the following values:

- `type` - The type of the resource. This can either be `HF` or `S3`
- `repo` - The name of the repo you want to download, `<username>/<repo-name>`
- `target` - The path within the container where the resources will be downloaded to

Here is an example:

```json
{
  "version": "0.1",
  "meta": {
    "trigger": "cli"
  },
  "type": "container",
  "ops": [
    {
      "id": "huggingface",
      "args": {
        "cmd": ["ls", "/data-models"],
        "gpu": true,
        "image": "ubuntu",
        "resources": [
          {
            "type": "HF",
            "repo": "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
            "target": "/data-models/"
          }
        ]
      },
      "type": "container/run"
    }
  ]
}
```

## Resource Caching

Resources are cached for 24 hours from the moment they are downloaded to a Nosana Node.

Note this does not mean the cached asset is cached to all other nodes in that specific market.
That means if a job gets picked up by Nosana Node `X` in the `97G9NnvBDQ2WpKu6fasoMsAKmfj63C9rhysJnkeWodAf` market, and a second job is posted in the same market and is picked up by Nosana Node `Y`, those resources will need to be downloaded again. Only if Nosana Node `X` picks up the job again, will the cached resources be available.

## Required resources per market

Nodes will have certain Docker images and inference models available as a prerequisite to enter their markets.

It's possible to retrieve a list of these required resources such as Docker images on a Nosana Node, by going to the following URL:
`https://dashboard.k8s.prd.nos.ci/api/markets/<Market-Address>/required-resources`

By replacing `<Market-Address>` with the address of a market, you will be able to retrieve the cached resources for that specific Nosana Market.

An example of the `97G9NnvBDQ2WpKu6fasoMsAKmfj63C9rhysJnkeWodAf` market would be the following.
<https://dashboard.k8s.prd.nos.ci/api/markets/97G9NnvBDQ2WpKu6fasoMsAKmfj63C9rhysJnkeWodAf/required-resources>

When we go to this url, we will see the following JSON.

```json
{
  "required_images": [
    "registry.hub.docker.com/nosana/frpc:0.1.0",
    "registry.hub.docker.com/nosana/stats:v1.0.4",
    "registry.hub.docker.com/nosana/llm_benchmark:1.0.0",
    "registry.hub.docker.com/nosana/remote-resource-helper:0.1.0",
    "docker.io/openmmlab/lmdeploy:v0.5.3-cu12",
    "docker.io/vllm/vllm-openai:v0.5.4",
    "docker.io/saladtechnologies/a1111:ipv6-v1.9.4"
  ],
  "required_remote_resources": [
    {
      "type": "S3",
      "url": "https://models.nosana.io/stable-diffusion/dreamshaper/8"
    }
  ]
}
```

Here we can see the list of cached Docker images, and cached models that is always available for this particular Nosana Market. All Nosana Nodes operating in this market will have these resources available. That means that as soon as the job is posted to the market and picked up a Nosana Node, it will be almost instantly available.