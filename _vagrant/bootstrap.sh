# install the ppa-finding tool
# add the ppa
sudo add-apt-repository ppa:couchdb/stable -y
# update cached list of packages
sudo apt-get update -y
# These packages need to be installed for our server to execute our app
sudo apt-get -y install curl apache2 php5 php5-curl php5-mcrypt python-software-properties
# Composer will be the package manager for our 3rd party PHP libraries
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
# remove any existing couchdb binaries
sudo apt-get remove couchdb couchdb-bin couchdb-common -yf
# see my shiny goodness - note the version number displayed and ensure its what you expect
sudo apt-get install -Vy couchdb
# manage via upstart
sudo service couchdb stop

# Create desired CouchDB configuration
sudo cp /vagrant/_vagrant/local.ini /etc/couchdb/local.ini
sudo chmod 0777 /etc/couchdb/local.ini

sudo service couchdb start

# Activate Apache2's mod_rewrite and mod_headers (just in case)
a2enmod rewrite
a2enmod headers

# Tell PHP to display error messages
sed -i '/display_errors = Off/c display_errors = On' /etc/php5/apache2/php.ini

# Increase maximum run time
sed -i '/max_execution_time = 30/c max_execution_time = 600' /etc/php5/apache2/php.ini
sed -i '/max_input_time = 60/c max_input_time = 600' /etc/php5/apache2/php.ini
sed -i '/upload_max_filesize = 2M/c upload_max_filesize = 10M' /etc/php5/apache2/php.ini

# Increase memory limit
sed -i '/memory_limit = 128M/c memory_limit = 256M' /etc/php5/apache2/php.ini

# Tell Apache2 to allow all types of .htaccess directives
# Tell Apache where to find the root of our site
sudo cp /vagrant/_vagrant/000-default.conf /etc/apache2/sites-available/000-default.conf
sudo chmod 0777 /etc/apache2/sites-available/000-default.conf

# Tell Apache2 to put its error.log into /public/logs
# sed -i '/ErrorLog ${APACHE_LOG_DIR}\/error.log/c ErrorLog /var/www/_logs/error.log' /etc/apache2/apache2.conf

# Restart Apache2 for the changes to take effect
service apache2 restart

sudo curl -X PUT http://localhost:5984/_config/admins/pixolith -d '"test12345"'
