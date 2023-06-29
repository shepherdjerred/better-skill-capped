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

ci:
  BUILD +devcontainer

devcontainer:
  FROM earthly/dind:ubuntu
  ARG TARGETARCH
  ARG version=0.1.11-beta.0
  RUN wget https://github.com/loft-sh/devpod/releases/download/v$version/devpod-linux-$TARGETARCH
  COPY .devcontainer .
  RUN --push devpod build github.com/my-org/my-repo --repository ghcr.io/my-org/my-repo
