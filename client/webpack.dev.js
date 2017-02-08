'use strict';

const HtmlWebpack = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ChunkWebpack = webpack.optimize.CommonsChunkPlugin;
const ProvidePlugin = webpack.ProvidePlugin;
const DefinePlugin = webpack.DefinePlugin;

module.exports = {
    devServer: {
        contentBase: path.resolve('dist'),
        historyApiFallback: true,
        stats: 'minimal',
        port: 9000
    },
    devtool: 'source-map',
    entry: {
        app: [ path.resolve('src', 'boot') ],
        vendor: [ path.resolve('src', 'vendor') ]
    },
    module: {
        loaders: [
            { loader: 'html-loader', test: /\.html$/ },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
                test: /\.(jpg|png|svg|eot|otf|ttf|woff(2)?)(\?[^]*)?$/,
                loader: 'file-loader'
            },
            { exclude: /node_modules/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'], test: /\.ts$/ }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve('dist')
    },
    plugins: [
        new ChunkWebpack({
            filename: 'vendor.bundle.js',
            minChunks: Infinity,
            name: 'vendor'
        }),
        new ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        }),
        new HtmlWebpack({
            filename: 'index.html',
            inject: 'body',
            template: path.resolve('src', 'index.html')
        }),
        new DefinePlugin({
            'ENV': JSON.stringify('development'),
            'API_URL': JSON.stringify('http://localhost:4567/api/')
        })
    ],
    resolve: {
        extensions: [ '.js', '.ts' ]
    }
};