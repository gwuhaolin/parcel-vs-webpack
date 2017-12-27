const path = require('path');
const {WebPlugin} = require('web-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './app/index',
  output: {
    // 控制输出JS文件的名称
    filename: '[name]_[chunkhash:8].js',
    path: path.resolve(__dirname, 'webpack-dist'),
  },
  resolve: {
    extensions: ['.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: isProd ?
          ExtractTextPlugin.extract({
            // 转换 .css 文件需要使用的 Loader
            use: ['css-loader?minimize', 'sass-loader']
          }) :
          ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: isProd ?
          ExtractTextPlugin.extract({
            // 转换 .css 文件需要使用的 Loader
            use: ['css-loader?minimize']
          }) :
          ['style-loader', 'css-loader']
      },
      {
        test: /\.tsx$/,
        use: [
          'ts-loader',
          {
            // 实现按需加载 antd
            loader: 'ui-component-loader',
            options: {
              'lib': 'antd',
              'style': 'style/index.css',
              'camel2': '-'
            }
          },
        ],
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // 控制输出CSS文件的名称
      filename: `[name]_[contenthash:8].css`,
    }),
    // 生成HTML
    new WebPlugin({
      template: 'template.html',
      filename: 'index.html'
    })
  ],
  devtool: isProd ? undefined : "source-map"
};
