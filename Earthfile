VERSION 0.7
PROJECT sjerred/better-skill-capped

pipeline.preview:
  PIPELINE
  TRIGGER pr main
  BUILD +ci

pipeline.push:
  PIPELINE --push
  TRIGGER push main
  BUILD +ci
  BUILD +devcontainer

ci:

devcontainer:
  FROM earthly/dind:ubuntu
  WORKDIR /workspace
  ARG TARGETARCH
  ARG version=0.1.11-beta.0
  RUN curl --location --fail --silent --show-error -o /usr/local/bin/devpod https://github.com/loft-sh/devpod/releases/download/v$version/devpod-linux-$TARGETARCH
  RUN chmod +x /usr/local/bin/devpod
  COPY .devcontainer/devcontainer.json .
  RUN --push --secret GITHUB_TOKEN=github_token echo $GITHUB_TOKEN | docker login ghcr.io -u shepherdjerred --password-stdin
  WITH DOCKER
    RUN devpod provider add docker && \
      devpod build github.com/shepherdjerred/better-skill-capped --repository ghcr.io/shepherdjerred/better-skill-capped
  END
