module.exports = {
	mode: 'development',
	entry: {
		block: './assets/js/init.js',
		pluginSettig: './assets/js/block_data.js',
	},
	output: {
		path: __dirname,
		filename: 'assets/js/[name].build.js',
	},
	module: {
		rules: [{
		  test: /.js$/, // include .js files
		  exclude: /node_modules/, // exclude any and all files in the node_modules folder
		  use: [{
			loader: "babel-loader",
			options: {
				presets: ["@babel/preset-env", "@babel/preset-react"],
			}
		  }]
		}]
	},
};