const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");
const AssetsWebpackPlugin = require('assets-webpack-plugin');

exports.devServer = ({ host, port, stats } = {}) => ({
    devServer: {
        stats, // Defaults to true
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        overlay: {
            errors: true,
            warnings: true,
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
                use: ['style-loader', 'css-loader'],
            }
        ]
    }
});

exports.extractCSS = ({ include, exclude, use }) => {
    const plugin = new ExtractTextPlugin({
        allChunks: true,
        filename: '[name].[contenthash:8].css',
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
                    }),
                },
            ],
        },
        plugins: [plugin]
    };
};

exports.loadTS = () => ({
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: /src/,
                use: 'awesome-typescript-loader?silent=true'
            }
        ]
    },
    plugins: [new CheckerPlugin()]
})

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
            canPrint: false,
        }),
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
