const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const dotenv = require('dotenv')

// add environment variables in .env to process.env
const CONFIG_RESULT = dotenv.config()

module.exports = {
  entry: ['webpack/hot/poll?1000', './src/index'],
  watch: true,
  devtool: 'sourcemap',
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
  module: {
    rules: [
      {
        // test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [['env', { modules: false }], 'stage-0'],
              plugins: ['transform-regenerator', 'transform-runtime']
            }
          }
        ],
        exclude: /node_modules/
      },
      {
	// test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'raw-loader'
        }
      }
    ]
  },
  plugins: [
    new StartServerPlugin('server.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.BUILD_TARGET': JSON.stringify('server'),
      'process.env.JWT_SECRET': JSON.stringify(process.env.JWT_SECRET),
      'process.env.MONGO_ADMIN': JSON.stringify(process.env.MONGO_ADMIN),
      'process.env.MONGO_ADMIN_PASSWORD': JSON.stringify(process.env.MONGO_ADMIN_PASSWORD),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false })
  ],
  output: { path: path.join(__dirname, 'dist'), filename: 'server.js' }
}

