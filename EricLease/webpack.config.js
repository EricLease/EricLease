const path = require('path');
const merge = require('webpack-merge');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

const parts = require('./webpack.parts');

module.exports = (env) => {
    const isDevBuild = !(env && env.toLowerCase() === 'prod');
    const isVendor = ({ resource }) => /node_modules/.test(resource);
    const commonConfig = merge([
        {
            entry: {
                'home': './src/app/home.ts',
                'test': './src/app/test.ts'
            },
            output: {
                filename: '[name].js',
                path: path.resolve(__dirname, 'dist')
            },
            resolve: { extensions: ['.js', '.ts'] },
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
        }
    ]);
    const devConfig = merge([
        parts.devServer({
            host: process.env.HOST,
            port: process.env.PORT
        }),
        parts.loadCSS()
    ]);
    const prodConfig = merge([
        parts.extractCSS({ use: 'css-loader' }),
        parts.extractBundles([
            {
                name: "common_vendor",
                chunks: ["home", "test"],
                minChunks: (module, count) => count >= 2 && isVendor(module)
            },
            {
                name: "home_vendor",
                chunks: ["home"],
                minChunks: isVendor
            },
            {
                name: "test_vendor",
                chunks: ["test"],
                minChunks: isVendor
            }
        ]),
    ]);


    if (isDevBuild) {
        return merge(commonConfig, devConfig);
    }

    return merge(commonConfig, prodConfig);
};