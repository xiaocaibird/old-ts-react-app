const webpack = require("webpack");
const path = require("path");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    module: {
        loaders: [
            /*{
                test: /\.jsx$|\.js$/,
                loader: "react-hot!babel-loader?presets[]=react,presets[]=es2015",
                include: path.join(__dirname, '/ts')
            },*/
            {
                test: /\.tsx?$/,
                loader: "react-hot!ts-loader",
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

            }],
    },
    entry: {
        vendor: [
            'jquery',
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
            'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
            'webpack/hot/dev-server', // "only" prevents reload on syntax errors
            "/ts/Component/index.tsx"
        ]
    },
    output: {
        path: path.join(__dirname, '/bundle'),
        filename: "[name].bundle.js",
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
        new webpack.HotModuleReplacementPlugin(),
        new CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: 'jquery',
            jquery: 'jquery'
        })
    ],
    devtool: 'inline-source-map'
};
