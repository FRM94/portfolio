const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js'
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					'css-loader',
					'sass-loader'
				],
				publicPath: '/dist'
			}),
			// test: /\.(jpg|png)$/,
			// use: [{
			// 	loader: 'file-loader',
			// 	options: {
			// 		name: '[name].[ext]',
			// 		outputPath: '/dist/images/',
			// 	}
			// }]
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Portfolio',
			minify: {
				collapseWhitespace: true
			},
			hash: true,
			template: './src/index.ejs'
		}),
		new ExtractTextPlugin({
			filename: 'app.css',
		})
	]
}
