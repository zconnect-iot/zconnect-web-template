# ZConnect Demo Front End

A minimal ZConnect front end demonstrating usage of [ZConnect Web](https://github.com/zconnect-iot/zconnect-web) and [ZConnect JS](https://github.com/zconnect-iot/zconnect-js).

Configured to work with [ZConnect Demo Backend](https://github.com/zconnect-iot/zconnect-django-demo).

Check out the [ZConnect Homepage](https://zconnect-iot.github.io/) for more info

![Screen Grab](https://media.giphy.com/media/jxjruGEZFdNzthuJjw/giphy.gif)

## Development

`git clone`

`git submodule update --init`

`npm i`

`npm start` - Webpack dev server

`npm run server` - Mock api if needed

devServer runs on `localhost:3000`

It's possible to use a mix of mock api server and real / local server instance by setting the `proxy` options in webpack.config.js as described (here)[https://webpack.js.org/configuration/dev-server/#devserver-proxy]
