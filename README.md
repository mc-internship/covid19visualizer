[![Build Status](https://travis-ci.com/mc-internship/covid19visualizer.svg?branch=master)](https://travis-ci.com/mc-internship/covid19visualizer)

# covid19visualizer
This contains our project for MasterCard 2020 summer tech internship.

## Good Practises

The following best practises are recommended:

1. Keep commits clean by `squashing` smaller commits into feature commits.
2. Rebase with master before creating a pull request.

### Workflow

1. `pull` changes from `master` before starting to work on your feature.
2. Test whether `master` is working before starting to add changes. (and report
   issues if any.)
3. `checkout` a `feature-branch`.

4. Add code.

5. Once you are done implementing your feature, `rebase` with `master` and
   create a `pull request`.

#### Rebasing

Let's say, while you are working on your feature-branch, new stuff is integrated onto the `master` branch. So the history might look like this:

```
1 - 2 - 3 - 5 (master)
    \
     4 - 6 - 7 - 8 (feature-branch)
```

If you simply create a pull-request and the `master` branch maintainer would have to merge it, he would need to deal with potential conflicts -- bad for the maintainer.

If you rebase the `feature-branch` branch onto `master` and resolve potential conflicts before submitting the pull-request the history would look like this : 

```
1 - 2 - 3 - 5 (master)
             \
              4 - 6 - 7 - 8 (feature-branch)
```

For details on how to rebase please refer [here](https://www.atlassian.com/git/tutorials/merging-vs-rebasing).

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
