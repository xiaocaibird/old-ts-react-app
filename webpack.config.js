const webpack = require("webpack");
const path = require("path");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

const _date = new Date().getTime().toString();
const _outpath = "[name].bundle." + _date + ".js";

module.exports = {
    module: {
        loaders: [
            /*{
                test: /\.jsx$|\.js$/,
                loader: "babel-loader?presets[]=react,presets[]=es2015",
                include: path.join(__dirname, '/ts')
            },*/
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                include: path.join(__dirname, '/ts')
            },
            {
                test: /.(png|jpg)$/,
                loader: 'url-loader?limit=8192',
                include: path.join(__dirname, '/image')

            },
            {
                test: /\.css$/,
                loaders: ["style", "css"],
                include: path.join(__dirname, '/css')

            }]
    },
    entry: {
        vendor: [
            "jquery",
            "lodash",
            "iscroll",
            "react",
            "redux",
            "react-dom",
            "react-router",
            "react-redux",
            'react-iscroll'
        ],
        app: [
            "/ts/Component/WebApp.tsx"
        ]

    },
    output: {
        path: path.join(__dirname, '/bundle'),
        filename: _outpath,
        publicPath: '/bundle/'
    },
    resolve: {
        extensions: ['', ".ts", ".tsx", ".js", ".jsx"]
    },
    compiler: {
        stats: {
            colors: true
        }
    },
    plugins: [
        new CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        /*new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: 'jquery',
            jquery: 'jquery'
        })*/
    ]
};
