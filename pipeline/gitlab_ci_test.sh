#!/usr/bin/env bash
set -euxo pipefail

yarn install --no-progress
#mkdir src/main/resources/static
yarn build
{
    yarn test
} || {
    kill -9 $(jobs -p)
    exit 1
}

{
   ./gradlew clean test
} || {
    kill -9 $(jobs -p)
    exit 1
}

apt-get update

apt-get install firefox --assume-yes

GECKODRIVER_VERSION=latest
GK_VERSION=$(if [ ${GECKODRIVER_VERSION:-latest} = "latest" ]; then echo "0.23.0"; else echo $GECKODRIVER_VERSION; fi) \
  && echo "Using GeckoDriver version: "$GK_VERSION \
  && wget --no-verbose -O /tmp/geckodriver.tar.gz https://github.com/mozilla/geckodriver/releases/download/v$GK_VERSION/geckodriver-v$GK_VERSION-linux64.tar.gz \
  && rm -rf /opt/geckodriver \
  && tar -C /opt -zxf /tmp/geckodriver.tar.gz \
  && rm /tmp/geckodriver.tar.gz \
  && mv /opt/geckodriver /opt/geckodriver-$GK_VERSION \
  && chmod 755 /opt/geckodriver-$GK_VERSION \
  && ln -fs /opt/geckodriver-$GK_VERSION /usr/bin/geckodriver

./gradlew build
./gradlew bootRun &

attempt=0
while [ $attempt -le 299 ];
do
  attempt=$(( $attempt + 1 ))
  if curl -s -o /dev/null http://localhost:8080/; then
          echo "$(date) - connected successfully"
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

{
yarn journey --root-options --no-sandbox
} ||
{
sleep 2
kill -9 $(jobs -p)
exit 1
}
sleep 2
kill -9 $(jobs -p)

exit 0