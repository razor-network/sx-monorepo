#!/usr/bin/env bash

set -e


if ! which docker 2>&1 > /dev/null; then
    echo "Please install 'docker' first"
    exit 1
fi

if ! which docker-compose 2>&1 > /dev/null; then
    echo "Please install 'docker-compose' first"
    exit 1
fi

# Start graph node
docker-compose up -d 


until curl -o /dev/null -s  http://localhost:8040/metrics; do
  >&2 echo "Graph node is unavailable - sleeping for while......"
  sleep 2
done
  
>&2 echo "Graph node is Up is up - executing command"

echo "Installing dependencies"
npm i

echo "Building app"
npm run codegen
npm run build

echo "Pushing app to local graph node"
npm run create-local
npm run deploy-local