#!/bin/sh

set -e

yarn install --frozen-lockfile
yarn migrations:run
yarn start
