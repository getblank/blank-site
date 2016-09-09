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
};