const webpack = require('webpack'); // remember to require this, because we DefinePlugin is a webpack plugin

// return a function from the config file
// the `env` variable will be a simple Object: { API_URL: 'http://localhost:8000' }
// it will contain all the environment variables (that we set in package.json) as key/value pairs
module.exports = (env) => {
  // this object is our actual webpack config
  return {
    plugins: [
      // add the plugin to your plugins array
      new webpack.DefinePlugin({ `process.env.API_URL`: JSON.stringify(${env.API_URL}) })
    ]
  };
};
