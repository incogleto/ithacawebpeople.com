const ExtractTextPlugin = require('extract-text-webpack-plugin')
const resolve = file => path.resolve( __dirname, file )
const webpack = require('webpack')
const path = require('path')

require('./environment')

const isProd = process.env.NODE_ENV === 'production'

const devPlugins = [
    new webpack.EnvironmentPlugin(['NODE_ENV', 'BASE_URL'])
]
const prodPlugins = [
    new webpack.EnvironmentPlugin(['NODE_ENV', 'BASE_URL']),
    new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
    }),
    new ExtractTextPlugin({
        filename: 'build.css'
    })
]

module.exports = {
    entry: ['whatwg-fetch', './src/client/index.js'],
    output: {
        path: resolve('./dist/public'),
        publicPath: '/public/',
        filename: 'build.js'
    },
    resolve: {
        modules: [
            resolve( './' ),
            'node_modules'
        ],
        alias: {
            'public': resolve('./dist/public')
        }
    },
    module: {
        noParse: /es6-promise\.js$/,
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: isProd,
                    preserveWhitespace: false,
                    postcss: [
                        require('autoprefixer')({
                            browsers: ['last 3 versions']
                        })
                    ]
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader?removeSVGTagAttrs=false'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                use: isProd
                    ? ExtractTextPlugin.extract({
                        use: 'css-loader?minimize',
                        fallback: 'vue-style-loader'
                    })
                    : ['vue-style-loader', 'css-loader']
            }
        ]
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false
    },
    plugins: isProd ? prodPlugins : devPlugins
}
