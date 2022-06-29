const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve('client','index.js'),
  output: {
    path: path.resolve('build'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      
      filename: 'index.html',
      template: path.resolve('client', 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }]
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }    
    ]
  },
  devServer: {
      static: path.resolve('build'),
      port: 8080,
      proxy: {
          '/': 'http://localhost:3000'
      },
      historyApiFallback: true
  }
}