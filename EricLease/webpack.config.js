const path = require('path');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const isVendor = ({ resource }) => /node_modules/.test(resource);
const buildDir = 'dist';

module.exports = (env) => {
    const commonConfig = merge([
        {
            entry: {
                'home': './src/app/home.ts',
                'test': './src/app/test.ts'
            },
            resolve: { extensions: ['.js', '.ts'] }
        },
        parts.loadTS()
    ]);
    const devConfig = merge([
        {
            output: {
                filename: '[name].js'
            }
        },
        parts.devServer({
            host: process.env.HOST,
            port: process.env.PORT
        }),
        parts.loadCSS()
    ]);
    const prodConfig = merge([
        {
            output: {
                chunkFilename: '[name].[chunkhash:8].js',
                filename: '[name].[chunkhash:8].js',
                path: path.resolve(__dirname, buildDir)
            }
        },
        parts.extractCSS({ use: 'css-loader' }),
        parts.extractBundles([
            {
                name: "common",
                chunks: ["home", "test"],
                minChunks: (module, count) => count >= 2 && isVendor(module)
            },
            {
                name: "home.vendor",
                chunks: ["home"],
                minChunks: isVendor
            },
            {
                name: "test.vendor",
                chunks: ["test"],
                minChunks: isVendor
            }
        ]),
        parts.clean(buildDir),
        parts.minifyJS(),
        parts.minifyCSS({
            options: {
                discardComments: {
                    removeAll: true
                },
                safe: true
            }
        }),
        parts.assetsMetadata({
            path: buildDir,
            filename: 'webpack.assets.json'
        })
    ]);

    return merge([
        commonConfig,
        env === 'prod' ? prodConfig : devConfig
    ]);
};