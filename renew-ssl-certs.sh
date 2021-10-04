#!/bin/bash 



DOMAIN_NAME=hmi.bdata.ca


if [ "$1" ]; then
  DOMAIN_NAME=$1
  
fi

## Setup
apt-get update
apt-get install python-minimal
python --version
apt-get install git-core
git --version

apt-get install letsencrypt certbot -y 

export LC_ALL="en_US.UTF-8"
export LC_CTYPE="en_US.UTF-8"

certbot certonly --standalone  -d $DOMAIN_NAME