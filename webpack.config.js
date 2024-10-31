const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js', // 入口文件，根据你的项目结构调整
    output: {
        filename: 'near-api-cocos.min.js', // 输出的文件名
        path: path.resolve(__dirname, 'dist'), // 输出路径
        // libraryTarget: 'commonjs2', // 输出为 CommonJS 模块格式
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/, // 匹配 .js 和 .mjs 文件
                resolve: {
                    fullySpecified: false, // 允许未完全限定路径的解析
                },
            },
            {
                test: /\.m?js$/, // 对所有 .js 文件进行处理
                exclude: /node_modules/, // 忽略 node_modules 目录
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], // 使用 preset-env 进行转换
                    },
                },
            },
            {
                test: /\.css$/, // 匹配所有的 CSS 文件
                use: [
                    'style-loader', // 将 CSS 注入到 JS 中，并在浏览器运行时插入 <style> 标签
                    'css-loader', // 解析 CSS 文件中的 @import 和 url() 语法
                ],
            },
        ],
    },
    optimization: {
        minimize: true, // 压缩输出
        minimizer: [new TerserPlugin()],
    },
    resolve: {
        mainFields: ['browser', 'module', 'main'],
        fallback: {
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            buffer: require.resolve('buffer/'), // Node.js 的 buffer 模块替换
            crypto: require.resolve("crypto-browserify"),
            vm: require.resolve("vm-browserify"),
            stream: require.resolve("stream-browserify"),
            util: require.resolve("util/"),
            url: require.resolve("url/"),
            process: require.resolve('process/browser'), // 这里添加 process 替代
        },
    },
    plugins: [
        // 使用 ProvidePlugin 将 Buffer 设置为全局变量
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser', // 提供 process 模块的 Polyfill
        }),
    ],
};
