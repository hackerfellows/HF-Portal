# -*- mode: ruby -*-
# vi: set ft=ruby :


Vagrant.configure("2") do |config|
	config.vm.box = "ubuntu/trusty64"
	config.vm.box_url = "https://atlas.hashicorp.com/ubuntu/boxes/trusty64"

	config.vm.host_name = "postgresql" 

	config.vm.provision "shell", inline: <<SCRIPT
echo I am provisioning...
date > /etc/vagrant_provisioned_at
SCRIPT

	config.vm.network "forwarded_port", guest: 5432, host: 15432
	config.vm.network "forwarded_port", guest: 3000, host: 3000
end


Vagrant::Config.run do |config|

	config.vm.share_folder "bootstrap", "/srv/hf", ".", :create => true

	#install postgres and node, then do npm install in the project root
	config.vm.provision :shell, :path => "vagrantInstallNodePostgres.sh"
	config.vm.provision "shell", inline: <<SCRIPT
		cd /srv/hf
		npm install
SCRIPT

	config.vm.provision :shell, inline: "cd /srv/hf; ./node_modules/.bin/nodemon -L",
		run: "always"



#	config.vm.provision "shell", inline: <<SCRIPT
#		sudo -u vagrant bash -c "$(curl -fsSL https://raw.github.com/mtfurlan/dotfiles/master/dotfiles)"
#SCRIPT

	#config.vm.provision "file", source: "~/.dotfiles", destination: ".dotfiles"
end
