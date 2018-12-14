const webpack = require("webpack")
const path = require("path")
const nodeExternals = require("webpack-node-externals")
const StartServerPlugin = require("start-server-webpack-plugin")

require("dotenv").config()

module.exports = {
  entry: ["webpack/hot/poll?1000", "./src/index"],
  mode: "development",
  watch: true,
  devtool: "sourcemap",
  target: "node",
  node: {
    __filename: true,
    __dirname: true
  },
  externals: [nodeExternals({ whitelist: ["webpack/hot/poll?1000"] })],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-transform-regenerator",
                "@babel/plugin-transform-runtime",
                "@babel/plugin-proposal-function-bind"
              ]
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new StartServerPlugin("server.js"),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.DefinePlugin({
    //   "process.env": JSON.stringify("server"),
    //   "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    //   // 'process.env.PORT': JSON.stringify(process.env.PORT),
    //   // "process.env.MONGO_URI": JSON.stringify(process.env.MONGO_URI)
    // }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],
  output: { path: path.join(__dirname, "dist"), filename: "server.js" }
}
