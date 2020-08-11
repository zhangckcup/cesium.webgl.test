const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const cesiumSrc = './node_modules/cesium/Build/Cesium';

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        cesium: path.resolve(__dirname, cesiumSrc)
      }
    },
    plugins: [
      new CopyWebpackPlugin([{ from: path.join('node_modules/cesium/Build/Cesium/Workers'), to: 'Workers' }]),
      new CopyWebpackPlugin([{ from: path.join('node_modules/cesium/Build/Cesium/Assets'), to: 'Assets' }]),
      new CopyWebpackPlugin([{ from: path.join('node_modules/cesium/Build/Cesium/Widgets'), to: 'Widgets' }]),
      new CopyWebpackPlugin([{ from: path.join('node_modules/cesium/Build/Cesium/ThirdParty'), to: 'ThirdParty' }])
    ],
    module: {
      unknownContextCritical: /^.\/.*$/,
      unknownContextCritical: false
    }
  }
};
