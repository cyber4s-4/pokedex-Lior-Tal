module.exports = {
  mode: 'development',
  entry: {
    app: './dist/tsc/app.js',
    landing: './dist/tsc/discover.js'
  },
  devtool: "source-map",
  output: {
    filename: "[name].js",
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
