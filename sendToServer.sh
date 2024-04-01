#!/bin/bash

npm run build

tar -czvf colibri.tar.gz build/
scp colibri.tar.gz root@23.239.28.71:/var/www/colibri/colibrifrontweb
rm -rf colibri.tar.gz
ssh root@23.239.28.71 'cd /var/www/colibri/colibrifrontweb/ && tar -xzvf colibri.tar.gz'