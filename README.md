# Pegelhub

This project contains the dedicated Angular application for the Pegelhub project.

The Angular version that is in use is `18.0.0`

## Running the application locally

The application can either be started via npm scripts or with the help of Docker.

### NPM Scripts

#### Prerequisites
Make sure that the following software is installed on your system:
- Node.js: `https://nodejs.org` - 18.19.1 || ^20.11.1 || ^22.0.0

#### Setup

1. Run `ng serve` for a dev server
2. Navigate to `http://localhost:4201/`
3. The application will automatically reload if you change any of the source files

### Docker

#### Prerequisites
Make sure that the following software is installed on your system:
- Docker Desktop: `https://www.docker.com/get-started`

#### Setup

1. Change directory to root directory if not already there
2. Execute command `docker-compose up`
3. Wait for the command to finish
4. Navigate to `http://localhost:4201/`
5. The application will **NOT** automatically reload if you change any of the source files

## Deployment

To deploy the application on a web server, follow the instructions below.
The application is deployed and made available in a docker container called `pegelhub-frontend`

### Prerequisites
Make sure that the following software is installed on your system:
- Docker Compose: `https://docs.docker.com/compose/install/`

### Configure Environment
- In Angular, environments are used to define which configuration should be used for which environment.
- The following environment file is used for the deployment via Docker: `environment.prod.ts`

### Involved files
- Navigate to the root directory of your Angular app.
- Here we find the `docker-compose.yml` file and `Dockerfile` which are both needed for a functioning deployment.
- `docker-compose.yml` defines which containers are to be created
- `Dockerfile` defines a series of commands that initiate the build, copy the resulting source and finally start the container.

### Startup Procedure
1. Start the process with `docker-compose up` or stop it with `docker-compose down`
2. Execute command `docker-compose up`
3. Wait for the command to finish
4. To make sure the application is running correctly, execute `docker-compose ps`
5. The container `pegelhub-frontend` should have the status `running`
6. If the container is running successfully, the application is accessible under port `4201`

## Architecural Overview
![Architectural Overview](Pegelhub.png)

## Theming
The application provides theming support in two different ways:
- theme.scss
- base-theme.scss

### theme.scss
The main theme file provides scss-variables used for coloring and shaping HTML elements. In order to change these parameters, the actual values need to be provided for the given SCSS variables.

### base-theme.scss
This is the PrimeNG main theme which is responsible for the general styling of the application. Here, changes can be done to the PrimeNG style classes and rules.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running End-to-End Tests

Run `ng test:e2e` to execute the e2e tests via [Cypress](https://www.cypress.io/).

## Running Component tests

Run `ng test:comp` to execute the component tests via [Cypress](https://www.cypress.io/).

## Compodoc

Serves as a documentation tool for this Angular application.
Based on the source code it generates a good-looking and easy-to-understand documentation that is easily accessible.

### Build

Execute the command `ng compodoc:build` to generate the documentation.

### Serve

Execute the command `ng compodoc:serve` to serve the documentation and gain access to it.
The documentation should be available on port **8080**.

**Note**

The build command should always be executed before starting with the serve procedure.
If this is not the case, the documentation will not be accessible.

### Build and Serve (combined)

Execute the command `ng compodoc:build-and-serve` to combine the build and serve procedures into one step.

## Highcharts

Represents a JavaScript charting library based on SVG and some canvas/WebGL.
Used to show all kind of diagrams and charts across the application.
