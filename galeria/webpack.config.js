const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {ProvidePlugin} = require('webpack')
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'app.js',
    },
    plugins: [
        new HtmlWebpackPlugin({template:'./src/index.html'}),
        new MiniCssExtractPlugin({filename: 'style.css'}),
        new CopyWebpackPlugin({
            patterns: [
                { context: 'src', from: 'html/*.html'},
                { context: 'src', from: 'img/*.*'}
            ]
        }),
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        })
    ],
    module:{
        rules:[
            {
                test: /\.(scss)$/,
                use: [{
                    // inject CSS to page
                    loader: MiniCssExtractPlugin.loader
                }, {
                    // translates CSS into CommonJS modules
                    loader: 'css-loader'
                }, {
                    // Run postcss actions
                    loader: 'postcss-loader',
                    options: {
                        // `postcssOptions` is needed for postcss 8.x;
                        // if you use postcss 7.x skip the key
                        postcssOptions: {
                            // postcss plugins, can be exported to postcss.config.js
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }
                }, {
                    // compiles Sass to CSS
                    loader: 'sass-loader'
                }]
            }
        ]
    }
};