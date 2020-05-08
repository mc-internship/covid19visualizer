# covid19visualizer
This contains our project for MasterCard 2020 summer tech internship.

## Setup Development Environment

### Rquirements

1. docker
2. docker-compose

### Docker for Windows

1. Please refer to instructions [here](https://docs.docker.com/docker-for-windows/install/)
2. Docker desktop already includes docker-compose so no manual installation is
   required.

### Docker for MacOS

1. Please refer to instruction [here](https://docs.docker.com/docker-for-mac/install/).
2. Docker desktop already includes docker-compose so no manual installation is
   required.

### Docker for Ubuntu

1. `sudo apt-get update`
2. `sudo apt-get install docker.io`
3. `sudo systemctl start docker`
4. `sudo systemctl enable docker`

### Testing

You can check your docker installation by running `docker --version` from the
command line.

## Using Development Environment

To use the development environment:

1. Clone this repository.
2. Open folder containing `docker-compose.yml` in command line.
3. Run `docker-compose up -d`
4. To check if environment setup was successful, run `docker-compose ps`.

#### Debugging

If you run into issues (if a particular container is not starting), you can do
the following :

1. `docker-compose up <service_name>` where `<service_name>` is the service that
   was unable to start (`backend`/ `frontend`/ `nginx`) and check the logs.
2. If the issue persists, please open an issue with a screenshot of above logs.
