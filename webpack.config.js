const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const AssetsPlugin = require('assets-webpack-plugin')

const rules = [
	{
		test: /\.js$/,
		use: [
			{
				loader: 'babel-loader',
				options: {
					plugins: [
						['@babel/plugin-transform-runtime', { corejs: 2 }],
						['angularjs-annotate', { explicitOnly: false }],
						'lodash'
					],
					presets: ['@babel/preset-env']
				}
			}
		],
		include: [
			path.join(__dirname, 'src')
		],
		exclude: /node_modules/
	},
	{
		test: /\.(html)$/,
		use: [{
			loader: 'html-loader',
			options: {
				minimize: false,
				collapseWhitespace: false
			}
		}]
	},
	{
		test: /\.scss$/,
		use: [
			{ loader: MiniCssExtractPlugin.loader },
			"css-loader",
			{
				loader: "sass-loader",
				options: { sourceMap: false }
			}
		]
	},
	{
		test: /\.css$/,
		use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
	},
	{
		test: /\.(woff|woff2|ttf|eot)$/,
		loader: 'file-loader?name=/assets/fonts/[name].[ext]'
	},
	{
		test: /\.(png|jpg|jpeg|gif|svg)$/,
		loader: 'file-loader?name=/assets/images/[name].[ext]',
	}
];

const plugins = [
	new webpack.ProgressPlugin(),
	new webpack.DefinePlugin({
		'ENV': JSON.stringify(process.env.NODE_ENV)
	}),
	new HtmlWebpackPlugin({
		minify: false,
		template: path.join(__dirname, 'src/index.html'),
		inject: 'body',
		hash: false
	}),
	new FaviconsWebpackPlugin({
		logo: 'src/favicon.png',
		inject: true
	}),
	new CopyPlugin([
		{ from: 'src/assets/fonts', to: path.resolve(__dirname, 'build/assets/fonts') },
		{ from: 'src/assets/images', to: path.resolve(__dirname, 'build/assets/images') },
		{ from: 'node_modules/@fortawesome/fontawesome-free/webfonts', to: path.resolve(__dirname, 'build/assets/fonts') },
		{ from: 'src/sitemap.xml', to: path.resolve(__dirname, 'build') },
		{ from: 'src/sitemap-static.xml', to: path.resolve(__dirname, 'build') },
		{ from: 'src/robots.txt', to: path.resolve(__dirname, 'build') },

	]),
	new webpack.ProvidePlugin({
		// jQuery: 'jquery',
		// $: 'jquery',
		Popper: ['popper.js', 'default']
	}),
	new MiniCssExtractPlugin({
		filename: "css/[name].css"
	})
];

if (process.env.NODE_ENV === 'development') {
	plugins.push(
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	);
}

if (process.env.NODE_ENV === 'production') {
	plugins.push(
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		})
	);
}


module.exports = {
	mode: process.env.NODE_ENV,
	cache: true,
	watch: true,
	context: __dirname,
	performance: {
		hints: false
	},
	devtool: 'source-map',
	devServer: {
		contentBase: path.resolve(__dirname, 'build'),
		compress: true,
		inline: true,
		hot: true,
		quiet: false,
		port: 4000,
		historyApiFallback: true,
		stats: {
			chunks: false,
			chunkModules: false
		}
	},
	entry: {
		app: ['./src/app/app.module.js']
	},
	output: {
		filename: '[name].bundle-[hash]-[id].js',
		chunkFilename: '[name].chunk-[hash]-[id].js',
		sourceMapFilename: '[name].bundle-[hash]-[id].map',
		path: path.join(__dirname, 'build')
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all'
				}
			}
		},
		minimizer: [new UglifyJsPlugin({
			sourceMap: true,
			uglifyOptions: {
				beautify: true,
				mangle: true,
				ie8: false,
				toplevel: false,
				compress: {
					booleans: true,
					conditionals: true,
					dead_code: true,
					drop_debugger: true,
					drop_console: true,
					evaluate: true,
					sequences: true,
					unused: true
				},
				output: {
					comments: false,
					beautify: false,
				}
			}
		})]
	},
	module: {
		rules
	},
	node: {
		fs: 'empty',
		global: true,
		crypto: 'empty'
	},
	resolve: {
		extensions: ['.js'],
		modules: ['node_modules', __dirname]
	},
	plugins
};
