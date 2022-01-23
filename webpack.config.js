/*
 * @Page: Do not edit
 * @Version: Do not edit
 * @Autor: Do not edit
 * @Date: 2021-11-05 14:41:28
 * @LastEditors: YueAo7
 * @LastEditTime: 2022-01-21 16:34:15
 */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, './tsconfig.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './main'),
        // library:{
        //     root:"NoelleCore",
        //     comonjs:"noelle-core",
        //     amd:"noelle-core"
        // },
        libraryTarget: 'commonjs',
    },
    plugins:[
        new CleanWebpackPlugin(),
    ]
};