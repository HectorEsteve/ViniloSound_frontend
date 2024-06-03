#!/bin/bash

# Establecer permisos de los directorios necesarios
chown -R daemon:daemon /usr/local/apache2/logs
chmod -R 755 /usr/local/apache2/logs

chown -R daemon:daemon /usr/local/apache2/htdocs
chmod -R 755 /usr/local/apache2/htdocs

# Iniciar Apache en primer plano
httpd-foreground
