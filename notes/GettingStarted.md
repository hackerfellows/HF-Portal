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
#### Log in to Vagrant virtual machine
```
vagrant ssh
```
The command prompt should show you are logged in as 'vagrant' user to the guest virtual machine.

#### Change into directory synced between host and guest (Vagrant virtual machine)
```
cd /srv/hf
```
Any files changed in the `/srv/hf` directory in the guest Vagrant virtual machine
will be synced with the github repository in the host machine. This allows developers to 
use their favorite editor on the host machine. Files created in the Vagrant environment
not in this synced folder might NOT be saved!

#### Halt Vagrant virtual machine
```
vagrant halt
```
Shutdown the virtual machine to stop it from consuming resources on the host machine.


## Development

### Github
Version control will be done from the host machine, not from the guest Vagrant virtual machine.

### Postgres
#### Log into Postgres from host machine
```
psql -U hf -h localhost -p 15432 -d hfportal
```
Password is `hunter.2`

### Gulp
#### Run Gulp
```
```
