module.exports = {
    mode: 'development',
    entry: {
        app: './dist/client/Typescript/app.js',
        discover: './dist/client/Typescript/discover.js'
    },
    devtool: "source-map",
    output: {
        filename: "client/[name].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
        ],
    }
}
