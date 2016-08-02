# -*- mode: ruby -*-
# vi: set ft=ruby :

# configure Vagrant virtual machine for development
Vagrant.configure("2") do |config|
	
	# use ubuntu 64bit for virtual machine
	config.vm.box = "ubuntu/trusty64"
	config.vm.box_url = "https://atlas.hashicorp.com/ubuntu/boxes/trusty64"

	# virtual machine name
	config.vm.host_name = "hfportal"


	#use more memory for mac npm issue
	config.vm.provider "virtualbox" do |v|
		v.memory = 1024
	end


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
	apt-get install g++ -y
	npm install -g gulp
	echo "done with provision chunk"
SCRIPT

	# This will be run every time the server is up up
	config.vm.provision :shell, inline: "echo 'installing npm things'; cd /srv/hf; npm install",
		run: "always"

	# use virtual private network
	config.vm.network "private_network", type: "dhcp"
	#config.vm.network "forwarded_port", guest: 5432, host: 15432
	#config.vm.network "forwarded_port", guest: 4000, host: 4000
	#config.vm.network "forwarded_port", guest: 5000, host: 5000
end
