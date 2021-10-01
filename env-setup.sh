#!/bin/sh
if [ -z $SUDO_USER ]
then
    echo "===== Script need to be executed with sudo ===="
    echo "Change directory to 'setup'"
    echo "Usage: sudo ./docker.sh"
    exit 0
fi

export DOCKER_VERSION=17



apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl
sudo apt-get install -y  libpangocairo-1.0-0 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxi6 libxtst6 libnss3 libcups2 libxss1 libxrandr2  libasound2 libatk1.0-0 libgtk-3-0 
apt-get install -y wine64
#apt-get install nginx certbot -y
apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
apt-key fingerprint 0EBFCD88
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list

apt-get update
#    apt-get install -y "docker-ce=${DOCKER_VERSION}.*"
apt-get install -y "docker-ce"
apt-get install -y "docker-compose"
apt-get install -y kubectl kubeadm


docker info
echo "======= Adding $USER to the docker group ======="
usermod -aG docker $SUDO_USER


#curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs npm
sudo apt install python3 python -y 


## Increase the docker host memory to 6gb
#sysctl -w vm.max_map_count=262144
echo "=== Docker, Python and Nodejs Added"

echo "======= PLEASE LOG OUT & LOG Back In ===="
echo "Then validate by executing    'docker ps'"
echo "Then validate by executing    'node --version'"
echo "Then validate by executing    'python3 --version'"


# Restart is needed after this