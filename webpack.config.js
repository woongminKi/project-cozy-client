// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   mode: 'production',
//   resolve: {
//     extensions: ['.jsx', '.js'], // a Webpack library that helps locate imported modules.
//   },
//   entry: {
//     //시작하는 파일 넣을 것
//     app: ['./src/index.js'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: ['style-loader', 'css-loader'],
//         exclude: /node_modules/, //제외함
//       },
//       {
//         test: /\.m?js/,
//         loader: 'babel-loader',
//         options: {
//           presets: ['@babel/preset-env', '@babel/preset-react'],
//         },
//         resolve: {
//           fullySpecified: false,
//         },
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.resolve(__dirname, './public/index.html'), //template도 꼭 작성해야 함!!
//     }),
//   ],
//   output: {
//     path: path.resolve(__dirname, 'dist'), //깃허브 페이지 배포를 위해 docs로 설정해주었다.
//     filename: 'app.js',
//   },
// };
