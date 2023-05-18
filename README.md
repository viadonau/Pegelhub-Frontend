# Pegelhub

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Architecural Overview
![Architectural Overview](Pegelhub.png)

## Deployment
To deploy the application on a web server, follow the instructions below. the application is deployed and made available in a docker container.

### Prerequisites
Make sure that the following software is installed on your system:
- Docker Desktop `https://www.docker.com/get-started`
- Docker Compose `https://docs.docker.com/compose/install`

### Configure Environment
- In angular, environments are used to define which configuration should be used for which environment.
- The following environment file is used for deployment via docker: `environment.prod.ts`
- Among other things, the end point of the API is stored in the variable `BASE_URL`.

### Step 1:
- Navigate to the root directory of your Angular app.
- Here we find a `docker-compose.yml` file and a `Dockerfile`, which are needed for deployment.
- The `docker-compose.yml` file refers to the Dockerfile. While the `docker-compose.yml` file defines which containers are to be created, the `Dockerfile` defines a series of commands that initiate the build, copy the resulting source and finally start the container.

### Step 2:
- The container can be built with the command `docker-compose build`. You can then start it with `docker-compose up` or stop it with `docker-compose down`.
- After the container has been started with `docker-compose up`, the application is accessible under port 80.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
