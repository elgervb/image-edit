import StyleLintPlugin from 'stylelint-webpack-plugin';
import webpack from 'webpack';
import base, { source } from './config.base';

const config = base('development');

// development overrides go here
config.watch = true;
config.devtool = 'eval-source-map';

config.plugins = config.plugins.concat([
    new StyleLintPlugin({
        context: source,
        syntax: 'scss',
    }),
    new webpack.HotModuleReplacementPlugin(),
]);

export default config;
