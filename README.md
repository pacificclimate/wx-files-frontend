# Wx Files Frontend

UI for the PCIC Weather Files service.

This app provides an interface for selecting and downloading weather files 
(wx files).

## Configuration

Wx Files is configured using  
environment variables (for basic configuration such as backend URLs).

### Environment variables

In a Create React App app, [environment variables are managed carefully](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables).
Therefore, most of the environment variables below begin with `REACT_APP_`, as required by CRA.

CRA also provides a convenient system for setting default values of environment variables
in various contexts (development, production, etc.).

Brief summary:

* `.env`: Global default settings
* `.env.development`: Development-specific settings (`npm start`)
* `.env.production`: Production-specific settings (`npm run build`)

For more details, see the
[CRA documentation](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables)).

Environment variables for configuring the app are:

`PUBLIC_URL`
* Base URL for for Plan2Adapt frontend app.
* For production, set this to the URL for Plan2Adapt configured in our proxy
server.

`REACT_APP_VERSION`
* Version of the app.
* This value should be set using `generate-commitish.sh` when the Docker image 
is built (see below).
* It is _not_ recommended to manually override the automatically generated 
value when the image is run.
* No default value for this variable is provided in any `.env` file.

`REACT_APP_WX_FILES_SERVICE_URL`
* URL of Wx Files metadata/data service.

`NODE_ENV`
* [**Automatically set; cannot be overridden manually.**](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables)

## Docker

We use Docker for dev/staging/test and production deployments.

### Manual processes

In general, PCIC DevOps automates Docker image building in our repositories,
and PCIC IT manages production deployment (using `docker-compose`).  
However, it can be useful to manually build and run a production Docker image.

### Build docker image

```bash
docker build -t wx-files-frontend \
    --build-arg REACT_APP_VERSION="$(./generate-commitish.sh)" .
```

**IMPORTANT**: Setting the build arg `REACT_APP_VERSION` as above is the most reliable
way to inject an accurate version id into the final app. This value can be overridden
when the image is run (by specifying the environment variable of the same name),
but it is not recommended, as it invites error.

### Run docker image

As described above, environment variables configure the app.
All are given default development and production values in the files
`.env`, `.env.development`, and `.env.production`.

These can be overridden at run time by providing them in the `docker run` 
command (`-e` option), or, equivalently, in the appropriate 
`docker-compose.yaml` element.

Typical run:

```bash
docker run --restart=unless-stopped -d \
  -p <external port>:8080 \
  --name wx-files-frontend \
  wx-files-frontend:<tag>
```

## Project initialization

This project was initialized using `create-react-app`.
For details see [Project initialization](docs/Project-initialization.md).
