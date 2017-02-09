#!/bin/bash

exec ./yarn/yarn-latest/bin/yarn run start &

echo $! > yarn-server-pid.lock
