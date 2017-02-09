#!/bin/bash

pkill -TERM -P  $(cat yarn-server-pid.lock) && rm yarn-server-pid.lock
