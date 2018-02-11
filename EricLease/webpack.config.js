const path = require('path');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const config = {
        entry: {
            'app.home': './src/app/home.ts',
            'vendor.home': './src/vendor/home.ts'
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        resolve: { extensions: ['.js', '.ts'] },
        module: {
            rules: [
                { test: /\.ts$/, include: /src/, use: 'awesome-typescript-loader?silent=true' },
                { test: /\.css(\?|$)/, use: ['style-loader', 'css-loader'] }
            ]
        }
    }

    return config;
};