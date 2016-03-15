# Plexus #
Express app Boilerplate for rapid app development. This branch is the Master branch of the boilerplate. For the same boilerplate but with Electron.js intergration use the [Electron Branche](https://github.com/jbstoker/Plexus/tree/master_electron "Electron Intergration")

> Warning this is an project created for my own fun and learning curve. You are free to fork or pull one of the plexus branches, but i won't do bugfixes of any kind. Also i won't awnser to an feature request of sorts.

# Usage #
Plexus uses two package managers, Node and Bower. Before you start the app you should update the packages for these managers.
## install/update ##
Run `npm install` to install/update the NodeJS packages and run `bower update` for the Bower packages.
## Starting app ##
The package.json file contains all start data, just start the app with `npm start` and all Grunt Tasks will be runned also.

## Wiki ##
[Plexus Docs](http://jbstoker.github.io/Plexus)

##How to install Linux/ubuntu##
   mkdir Plexus
   cd Plexus
   git init
   git remote add origin https://github.com/jbstoker/Plexus.git
   git pull
   git pull origin develop
   git checkout develop
  
##How to install dependancies onLinux/ubuntu##

wget http://download.redis.io/redis-stable.tar.gz
 5512* tar xvzf redis-stable.tar.gz
 5513* cd redis-stable
 5514* make
 5519* sudo make install
 5520* make test
 
 ##Install grunt ##
 5544  npm install -g grunt-cli
 5553  sudo npm install -g grunt-contrib-uglify
 5554  sudo npm install -g grunt-contrib-concat
 5555  sudo npm install -g grunt-contrib-less
 5556  sudo npm install -g grunt-contrib-uglify
 5557  sudo npm install -g grunt-contrib-copy
 5558  sudo npm install -g grunt-strip-css-comments
 
 Required software
 Grunt
 Bower
 Redis
 mongoDB


