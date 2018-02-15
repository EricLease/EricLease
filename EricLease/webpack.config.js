const path = require('path');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const isVendor = ({ resource }) => /node_modules/.test(resource);
const buildDir = 'dist';

process.env.HOST = process.env.HOST || 'localhost';
process.env.PORT = process.env.PORT || '8080';

module.exports = (env) => {
    const commonConfig = merge([
        {
            entry: {
                'vue-app': './src/vue/index.ts'
            },
            resolve: {
                extensions: ['.js']
            }
        },
        parts.loadFonts(),
        parts.loadTS({
            options: {
                appendTsSuffixTo: [/\.vue$/]
            }
        })
    ]);
    const devConfig = merge([
        {
            output: {
                filename: '[name].js',
                // Enforce full path for assets from file-loader to work correctly
                publicPath: `http://${process.env.HOST}:${process.env.PORT}/`
            }
        },
        parts.devServer({
            host: process.env.HOST,
            port: process.env.PORT
        }),
        parts.loadVue({
            options: {
                loaders: {
                    'css': 'vue-style-loader!css-loader'
                }
            }
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
        parts.loadVue({
            options: { extractCSS: true }
        }),
        parts.extractCSS({use: 'css-loader' }),
        parts.extractBundles([
            {
                name: 'common',
                chunks: ['vue-app'],
                minChunks: (module, count) => count >= 2 && isVendor(module)
            },
            {
                name: 'vue-app.vendor',
                chunks: ['vue-app'],
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
        }),
        parts.prodOptimization()
    ]);

    return merge([
        commonConfig,
        env === 'prod' ? prodConfig : devConfig
    ]);
};