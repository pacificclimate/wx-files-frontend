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

## Project initialization

This project was initialized using `create-react-app`.
For details see [Project initialization](docs/Project-initialization.md).
