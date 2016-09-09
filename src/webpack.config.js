var webpack = require("webpack");

module.exports = {
    entry: ["whatwg-fetch", "./js/app.js"],
    devtool: "inline-source-map",
    output: {
        path: "../static",
        filename: "app.bundle.js",
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: false,
            //mangle: false,
            output: {
                comments: false,
            },
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production"),
            },
        }),
    ],
};