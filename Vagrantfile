Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.box_url = "https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"
  config.vm.hostname = "d3react.vagrant.vm"
  config.vm.network :forwarded_port, guest: 80, host: 1234
  config.vm.synced_folder "", "/var/www"
  config.vm.provision :shell, :path => "_vagrant/bootstrap.sh"
end
