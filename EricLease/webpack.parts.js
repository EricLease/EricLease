const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const AssetsWebpackPlugin = require('assets-webpack-plugin');

exports.devServer = ({ host, port, stats } = {}) => ({
    devServer: {
        stats, // Defaults to true
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        overlay: {
            errors: true,
            warnings: true
        },
        headers: {
            // Allow fonts to be requested from IIS (http://localhost/EricLease)
            'Access-Control-Allow-Origin': '*'
        }
    }
});

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css(\?|$)/,
                include,
                exclude,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
});

exports.extractCSS = ({ include, exclude, use }) => {
    const plugin = new ExtractTextPlugin({
        allChunks: true,
        filename: '[name].[contenthash:8].css'
    });

    return {
        module: {
            rules: [
                {
                    test: /\.css(\?|$)/,
                    include,
                    exclude,
                    use: plugin.extract({
                        use,
                        fallback: 'style-loader',
                    })
                }
            ]
        },
        plugins: [plugin]
    };
};

exports.loadFonts = () => ({
    module: {
        rules: [
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    }
});

exports.loadTS = ({ options } = {}) => ({
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: /src/,
                loader: 'ts-loader',
                options
            }
        ]
    }
});

exports.loadVue = ({ options } = {}) => ({
    resolve: {
        extensions: ['.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options
            }
        ]
    }
});

exports.extractBundles = bundles => ({
    plugins: bundles.map(
        bundle => new webpack.optimize.CommonsChunkPlugin(bundle)
    )
});

exports.clean = path => ({
    plugins: [new CleanWebpackPlugin([path])]
});

exports.minifyJS = () => ({
    plugins: [new UglifyWebpackPlugin()]
});

exports.minifyCSS = ({ options }) => ({
    plugins: [
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: options,
            canPrint: false
        })
    ]
});

exports.assetsMetadata = ({ path, filename }) => ({
    plugins: [
        new AssetsWebpackPlugin({
            path: path,
            filename: filename,
            prettyPrint: true
        })
    ]
});

exports.prodOptimization = () => ({
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
});
