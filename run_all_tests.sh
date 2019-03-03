#!/usr/bin/env bash
set -Eeuxo pipefail


kill `ps -ef | grep [b]ootRun | awk '{print $2}'` > /dev/null 2>&1  || echo "Not running"
kill `ps -ef | grep [M]vpBackendApplication | awk '{print $2}'` > /dev/null 2>&1  || echo "Not running"

yarn install
yarn test
yarn build

./gradlew test
./gradlew bootRun > /dev/null 2>&1 &

attempt=0
while [ $attempt -le 299 ];
do
  attempt=$(( $attempt + 1 ))
  if curl -s -o /dev/null http://localhost:8080/; then
          echo "$(date) - connected successfully"
          yarn journey

          kill `ps -ef | grep [b]ootRun | awk '{print $2}'` > /dev/null 2>&1
      break
  fi
  echo "$(date) - still trying to connect to http://localhost:8080"
  sleep 1
done

if [ $attempt -eq 300 ]; then
  echo "Timed out while trying to connect to http://localhost:8080"
  kill -9 $(jobs -p)
  exit 1
fi