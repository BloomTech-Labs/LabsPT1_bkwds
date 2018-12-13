const path = require("path")

require("dotenv").config()

module.exports = {
  entry: {
    app: "./src/index"
  },
  mode: "production",
  watch: false,
  target: "node",
  node: {
    __filename: true,
    __dirname: true
  },
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
  plugins: [],
  output: { path: path.join(__dirname, "dist"), filename: "server.js" }
}
