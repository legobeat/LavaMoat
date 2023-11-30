FROM node:18-alpine as base
WORKDIR /app
USER 1000
COPY --chown=1000 . .

FROM base as tester
RUN npm i && npm i -D depcheck && npm run test:prep && npm run lint:deps && npm run test

FROM base as builder
ENV NODE_ENV=production
RUN npm i --omit=dev && npm run test:prep

FROM node:18-alpine
WORKDIR /app
COPY --from=builder --chown=1000 /app /opt/allow-scripts
RUN ln -s /opt/allow-scripts/src/cli.js /usr/local/bin/allow-scripts
USER 1000
ENTRYPOINT ["/usr/local/bin/allow-scripts"]
