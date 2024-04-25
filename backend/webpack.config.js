const path = require('path');

module.exports = {
  entry: './app.js',  // 入口文件路径
  output: {
    filename: 'bundle.js',  // 输出的文件名
    path: path.resolve(__dirname, 'dist')  // 输出目录路径
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,  // 匹配需要转换的文件类型
        exclude: /(node_modules|dist)/,  // 排除不需要转换的目录
        use: {
          loader: 'babel-loader',  // 使用 babel-loader 进行转换
          options: {
            presets: ['@babel/preset-env'] // 使用 preset-env 进行代码转换
          }
        }
      }
    ]
  }
};
