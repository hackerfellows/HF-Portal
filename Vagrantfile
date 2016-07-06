# -*- mode: ruby -*-
# vi: set ft=ruby :

$script = <<SCRIPT
echo I am provisioning...
date > /etc/vagrant_provisioned_at
SCRIPT

Vagrant.configure("2") do |config|
	config.vm.provision "shell", inline: $script

	config.vm.network "forwarded_port", guest: 5432, host: 15432
end


Vagrant::Config.run do |config|
	config.vm.box = "ubuntu/trusty64"
	config.vm.box_url = "https://atlas.hashicorp.com/ubuntu/boxes/trusty64"
	config.vm.host_name = "postgresql" 

	config.vm.share_folder "bootstrap", "/mnt/bootstrap", ".", :create => true
	config.vm.provision :shell, :path => "bootstrap.sh"
	
end
