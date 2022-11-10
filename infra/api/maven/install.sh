#!/bin/sh

./mvn-entrypoint.sh
cd app
mvn install
mvn quarkus:dev
tail -f /dev/null