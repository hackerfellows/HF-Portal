# Getting Started
Development is done in a Vagrant environment, which runs in a virtual machine.
This enables development environments to remain consistent and avoids developers
from spending time provisioning databases, servers, etc.

## Setup Development Environment
### [Install Vagrant](https://www.vagrantup.com/)

### [Install Virtual Box](https://www.virtualbox.org/)

### Set up Vagrant
#### Start Vagrant virtual Machine
```
vagrant up
```
Vagrant provisioning scripts will run and set up the Vagrant virtual machine.
If Vagrant times out, open Virtualbox and try starting the virtual machine manually.
If an error is thrown about "vt-x" or "amd-v" then ask operations.

## Start Developing
### Start Vagrant virtual machine
```
vagrant up
```

### Log in to Vagrant virtual machine
```
vagrant ssh
```
The command prompt should show you are logged in as 'vagrant' user to the guest virtual machine.

### Change into directory synced between host and guest (Vagrant virtual machine)
```
cd /srv/hf
```
Any files changed in the `/srv/hf` directory in the guest Vagrant virtual machine
will be synced with the github repository in the host machine. This allows developers to 
use their favorite editor on the host machine. Files created in the Vagrant environment
not in this synced folder might NOT be saved!

### Run [Expressjs server](http://expressjs.com/) for backend and [Browsersync](https://www.browsersync.io/) for frontend.
```
gulp watch
```
Open browser to `http://localhost:3000` to see frontend.

### Postgres
#### Log into Postgres from host machine
```
psql -U hf -h localhost -p 15432 -d hfportal
```
Password is `hunter.2`

### Github
Version control will be done from the host machine, not from the guest Vagrant virtual machine.

### Halt Vagrant virtual machine
```
vagrant halt
```
Shutdown the virtual machine to stop it from consuming resources on the host machine.

### Destroy Vagrant virtual machine
```
vagrant destroy
```
Destroy the virtual machine and start over by running `vagrant up`
