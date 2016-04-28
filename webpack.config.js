var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry: {
		"bundle":'./app/entry.jsx',
		"polyfill":'./app/polyfill.js'
		// ,"jquery":'./app/jquery.js'
	},
	output: {
	    path: __dirname+'/dist/',
	    filename: '[name].js'
	},
	resolve: {
	    extensions: ['', '.js', '.jsx','css']
	},
 	module: {
        loaders: [
        	 {test: /(\.jsx|\.js)$/, loader: "babel",query: {
		        presets: ['es2015','react']
		     }}
             //{ test: /\.jsx$/,  loaders: ['jsx?harmony'] }
			,{ test: /\.css$/, loader: ExtractTextPlugin.extract("css-loader?root=..")}
			,{test: /.(png|jpg)$/, loader: 'url-loader?limit=10000'}
        ]
    },
    plugins: [
    	new ExtractTextPlugin("style.css")
	]
};