FROM --platform=linux/arm64 node:20.10-alpine3.19
WORKDIR /app
ADD build ./build
ADD package* ./
ADD node_modules ./node_modules
EXPOSE 3000
ENTRYPOINT [ "node", "build/src/index.js" ]
