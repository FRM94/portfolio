const WEBPACK             = require( 'webpack' );
const HTML_WEBPACK_PLUGIN = require( 'html-webpack-plugin' );
const EXTRACT_TEXT_PLUGIN = require( 'extract-text-webpack-plugin' );
const AUTOPREFIXER        = require( 'autoprefixer' );
const COPY_WEBPACK_PLUGIN = require( 'copy-webpack-plugin' );
const PATH                = require( 'path' );

module.exports = {
	entry: './src/app.js',
	output: {
		path: PATH.resolve( __dirname, 'dist' ),
		filename: 'app.bundle.js'
	},
	devServer: {
		inline: true,
		port: 8080
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: EXTRACT_TEXT_PLUGIN.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								publicPath: '/dist'
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => {
									return [
										require( 'autoprefixer' )
									];
								},
								publicPath: '/dist'
							}
						},
						{
							loader: 'sass-loader',
							options: {
								publicPath: '/dist'
							}
						}
					]
				})
			},
			{
				test: /\.(jpg|jpe?g|png|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images/',
						}
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ 'es2015' ]
					}
				}
			}
		]
	},
	plugins: [
		new HTML_WEBPACK_PLUGIN({
			title: 'Portfolio',
			minify: {
				collapseWhitespace: true
			},
			hash: true,
			template: './src/index.ejs'
		}),
		new EXTRACT_TEXT_PLUGIN({
			filename: 'app.css',
		}),
		new COPY_WEBPACK_PLUGIN([
			{ from: 'src/assets/images', to: 'images' }
		])
	]
}
