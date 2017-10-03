#!/bin/bash

#Cleanup old server/build files
#Remove the generated folder called
rm -r ~/"server" 2>/dev/null
./gradlew clean

#Rebuild the project and extract it to home
./gradlew build
cp server/build/distributions/server.tar ~/server.tar -v
tar xvf ~/server.tar -C ~

#Get rid of the tar, and move sage.sh executable into home
rm ~/server.tar
cp .sage_run.sh ~/sage.sh

