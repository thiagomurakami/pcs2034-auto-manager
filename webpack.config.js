// Adicionar:
// Multiple entrypoints (lazy load)
// Async loading
// live reload

var webpack = require('webpack')

var bower_dir = __dirname + '/bower_components';
/*
 Usage:
 if (__DEV__){
  //debugCode
 }
 if (__PRERELEASE__){
  //NewFeatureInDevelopment
 }

 This code will be removed when the definitions are false and the code is run with webpack -p
*/
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'true'))
})

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js')

var webpackConfig = {
  addVendor: function(name, path){
    //this.resolve.alias[name] = path
    //this.module.noParse.push(new RegExp(path))
  },

  entry: ['./src/js/views/mainPage.js'],

  resolve: { alias: {} },

  output: {
    path: process.env.NODE_ENV === 'production' ? './dist' : './build',
    filename: 'bundle.js'
  },

  plugins: [definePlugin],

  module: {
    noParse: [],
    loaders: [
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}, //exemple
      {test: /\.(png|gif|jpg|jpeg)$/, loader: 'url-loader?limit=100000'}, //convert png < 100K to inline base64
      {test: /\.js$/, loader: 'jsx-loader'}, // use jsx-loader?harmony to allow ES6
      {test: /\.woff/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
      {test: /\.ttf/, loader: 'file-loader'},
      {test: /\.eot/, loader: 'file-loader'},
      {test: /\.svg/, loader: 'file-loader'},
      {test: /\.(ogv|webm|mp4)$/, loader: 'file-loader'}
    ]
  }
};

webpackConfig.addVendor('react', bower_dir + '/react/react.js');

module.exports = webpackConfig
