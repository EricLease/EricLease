const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = ({ host, port, stats } = {}) => ({
    devServer: {
        stats, // Defaults to true
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        overlay: {
            errors: true,
            warnings: true,
        },
    },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css(\?|$)/,
                include,
                exclude,
                use: ['style-loader', 'css-loader'],
            },
        ]
    }
});

exports.extractCSS = ({ include, exclude, use }) => {
    const plugin = new ExtractTextPlugin({
        allChunks: true,
        filename: '[name].css',
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

exports.extractBundles = bundles => ({
    plugins: bundles.map(
        bundle => new webpack.optimize.CommonsChunkPlugin(bundle)
    ),
});