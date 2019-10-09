//this script bundles all code into 1 js file
//referenced from: https://codeburst.io/setting-up-a-react-project-from-scratch-d62f38ab6d97

/*
* setup babel-loader for loading js/jsx files and 
* used less-loader for loading less files.
* In order to user less-loader we also have to install 
* style-loader and css-loader which will directly append 
* CSS to the index.html
*/

var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../') //maybe need to change this??

// bundle source files
module.exports = {
	entry: [
		path.join(parentDir, 'index.js')
	],
	module: {
		loaders: [
            {
			test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
            },
            {
				test: /\.less$/,
				loaders: ["style-loader", "css-loader", "less-loader"]
			}
		]
    },
    // tell webpack config where to output our bundle.js file
    output: {
        path: parentDir + '/dist', 
        filename: 'bundle.js'
    },
    // providing the options for dev server
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true
    }
}

