import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import cssMqpacker from 'css-mqpacker';
import cssnext from 'postcss-cssnext';
import WebpackErrorNotificationPlugin from 'webpack-error-notification';

import { config } from '../package.json';
import cssnextConfig from './config/cssnext.json';

export const source = path.resolve(path.join(config.src));
export const destination = path.resolve(path.join(config.dest));

export default () => ({
    entry: [
        'babel-polyfill',
        path.join(source, 'scss', 'main.scss'),
        path.join(source, 'js', 'main.jsx'),
        path.join(source, 'index.html'),
    ], 

    module: {
        preLoaders: [
            {
                test: /\.js(x)?$/,
                include: [source],
                loader: 'eslint-loader',
            },
            {
                test: /\.html/, 
                loader: 'htmlhint', 
                exclude: [/node_modules/],
            },
        ],
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style',
                    'css?sourceMap!postcss?sourceMap!sass??outputStyle=expanded&sourceMap=true&sourceMapContents=true'),
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel?cacheDirectory',
            },
            {
                test: /\.jsx$/,
                exclude: [/node_modules/],
                loader: 'babel?cacheDirectory',
            },
            {
                test: /\.html$/, 
                loader: 'raw',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack',
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file',
            },
        ],
    },
    
    eslint: {
        configFile: '.eslintrc',
    },

    htmlhint: {
        configFile: '.htmlhintrc',
    },
    
    sassLoader: {
        includePaths: [
            './node_modules',
        ],
    },

    output: {
        filename: 'js/[name].js',
        path: destination,
    },

    postcss: () => [cssnext(cssnextConfig), cssMqpacker],

    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        new CopyWebpackPlugin([
            {
                from: path.join(source, 'assets'),
                to: path.join(destination, 'assets'),
            },
            {
                from: path.join(source, 'index.html'),
                to: path.join(destination, 'index.html'),
            },
        ]),
        new webpack.NoErrorsPlugin(),
        new WebpackErrorNotificationPlugin(),
        // Automatically move all modules defined outside of application directory to vendor bundle.
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module => module.resource && 
                        module.resource.indexOf(path.resolve(__dirname, '..', 'src')) === -1,
        }),
    ],
});
