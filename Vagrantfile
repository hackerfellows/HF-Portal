# -*- mode: ruby -*-
# vi: set ft=ruby :

# configure Vagrant virtual machine for development
Vagrant.configure("2") do |config|
	
    # use ubuntu 64bit for virtual machine
    config.vm.box = "ubuntu/trusty64"
	config.vm.box_url = "https://atlas.hashicorp.com/ubuntu/boxes/trusty64"
    
    # virtual machine name
	config.vm.host_name = "hfportal" 

    # start provisioning the virtual machine
	config.vm.provision "shell", inline: <<SCRIPT
        echo I am provisioning...
        date > /etc/vagrant_provisioned_at
SCRIPT

    # create synced folder so that changes between the root directory
    config.vm.synced_folder ".", "/srv/hf", :create => true
	
    # install postgres and nodejs
	config.vm.provision :shell, :path => "vagrantInstallNodePostgres.sh"
    
    # install project npm dependencies and gulp globally
    config.vm.provision "shell", inline: <<SCRIPT
		npm install -g gulp
		cd /srv/hf
		npm install
SCRIPT

    # forward postgres and browsersync port
	config.vm.network "forwarded_port", guest: 5432, host: 15432
	config.vm.network "forwarded_port", guest: 3000, host: 3000
    
    # use virtual private network
	config.vm.network "private_network", type: "dhcp"
end
