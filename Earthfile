VERSION 0.7
PROJECT sjerred/better-skill-capped

pipeline.preview:
  PIPELINE
  TRIGGER pr main
  BUILD +build
  BUILD +lint
  BUILD ./fetcher+build

pipeline.push:
  PIPELINE --push
  TRIGGER push main
  BUILD +lint
  BUILD +deploy --prod=true
  BUILD ./fetcher+deploy

node:
  FROM node:lts
  WORKDIR /workspace
  RUN npm i -g npm

deps:
  FROM +node
  COPY package*.json .
  RUN npm ci
  SAVE ARTIFACT package*.json AS LOCAL ./

src:
  FROM +deps
  COPY --dir src public assets index.html tsconfig* vite.config.ts .

lint:
  FROM +src
  COPY .eslint* .gitignore .prettier* tsconfig* .
  RUN npm run lint:fix

build:
  FROM +src
  RUN npm run build
  SAVE ARTIFACT dist AS LOCAL dist

deploy:
  ARG prod=false
  FROM +node
  ENV NETLIFY_SITE_ID=4374825e-365d-4cb3-8117-71e1d8c0c960
  RUN npm i -g netlify-cli
  COPY +build/dist dist
  RUN --push --secret NETLIFY_AUTH_TOKEN=netlify_token npx netlify-cli link
  IF [ $prod = "true" ]
    RUN --push --secret NETLIFY_AUTH_TOKEN=netlify_token npx netlify-cli deploy --dir=dist --prod
  ELSE
    RUN --push --secret NETLIFY_AUTH_TOKEN=netlify_token npx netlify-cli deploy --dir=dist
  END
