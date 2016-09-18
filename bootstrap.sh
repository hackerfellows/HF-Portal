#!/usr/bin/env bash

# update and upgrade Ubuntu packages
apt-get update
apt-get upgrade -y

# reset path for where to find executables
RESET_PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
echo "export PATH=$RESET_PATH" > /etc/profile

# install Go
echo "Installing Go..."
GO_VERSION=1.7.1
GO_OS=linux
GO_ARCH=amd64
GO_TAR=go$GO_VERSION.$GO_OS-$GO_ARCH.tar.gz
cd /tmp
rm -f $GO_TAR
wget -q https://storage.googleapis.com/golang/$GO_TAR
tar -C /usr/local -xzf $GO_TAR
echo "export PATH=$PATH:/usr/local/go/bin" > /etc/profile
GO_WORKSPACE=/home/vagrant/work
mkdir -p $GO_WORKSPACE
echo "export GOPATH=$GO_WORKSPACE" >> /home/vagrant/.profile
echo "Go installed."
