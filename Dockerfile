FROM --platform=linux/arm64 node:20.10-alpine3.19
WORKDIR /app
ARG REF
ARG COMMIT_HASH
ADD server ./server
ADD client ./client
ADD package* ./
ADD node_modules ./node_modules
RUN echo "export REF=$REF" > commit_info.txt && echo "export COMMIT_HASH=$COMMIT_HASH" >> commit_info.txt
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
