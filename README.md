# Proyecto ViniloSound

Para el correcto funcionamiento de la web se debe desplegar tanto el frontend como el backend. A continuación está descrito el despliegue del backend en local, mientras que el frontend lo podéis encontrar en [ViniloSound_frontend](https://github.com/HectorEsteve/ViniloSound_backend).

## Instalación de Docker

Para instalar Docker, podéis seguir el tutorial de instalación en el siguiente enlace: [Instalación de Docker](https://docs.docker.com/engine/install/).

Para darle permisos y no tener que usar `sudo` en los comandos, ejecutad los siguientes comandos:

```sh
sudo usermod -aG docker $USER
newgrp docker
```

## Clonar el Repositorio

El segundo paso es clonar este repositorio:

```sh
git clone https://github.com/HectorEsteve/ViniloSound_frontend
```

Una vez instalado, accedemos a la carpeta `ViniloSound_frontend`:

```sh
cd ViniloSound_frontend
```

## Montar el Contenedor

Ya podemos montar el contenedor y levantarlo:

```sh
docker-compose build
docker-compose up -d
```
