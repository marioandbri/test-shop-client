const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry: path.resolve(__dirname, "src/index.js"),
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, "dist/"),
		},
		compress: true,
		port: 8080,
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							[
								"@babel/preset-env",
								{
									useBuiltIns: "usage",
									corejs: 3,
									targets: "> 0.25%, not dead",
								},
							],
						],
					},
				},
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: "file-loader",
					},
				],
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
		],
	},
	plugins: [new webpack.HotModuleReplacementPlugin({ multistep: true })],
};
