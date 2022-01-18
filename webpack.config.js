var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var BomPlugin = require("webpack-utf8-bom");
var CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = [{
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    entry: ['babel-polyfill', "./src/renderer/index.js"],
    output: {
        path: path.resolve(__dirname, "./dist/html"),
        filename: "renderer.bundle.js",
        sourceMapFilename: "bundle.map"
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: "babel-loader",
            include: [path.resolve(__dirname, "src/renderer")],
            exclude: [/node_modules/, path.resolve(__dirname, "src/main")],
            query: {
                presets: ["@babel/env", "@babel/react"],
                plugins: [
                    [
                        "import", { libraryName: "antd", style: "css" }
                    ]
                ]
            }
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: "file-loader",
            query: {
                name: "assets/[name].[ext]?[hash]",
                esModule: false
            }
        },
        {
            test: /\.(node)$/,
            loader: "node-loader",
        },
        {
            test: /\.(woff|woff2|ttf|svg|eot)$/,
            use: {
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 10000,
                    name: "font/[name].[ext]?[hash]"
                }
            }
        },
        {
            test: /\.(png|jpg)$/,
            loader: 'url-loader',
            options: {
                esModule: false
            }
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        esModule: false,
                        sourceMap: true,
                        name: "style/[name].[ext]?[hash]"
                    }
                }
            ]
        },

        {
            test: /\.(scss|sass)$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        esModule: false
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        esModule: false
                    }
                }
            ]
        },
        {
            test: /\.(htm|html)$/,
            loader: "html-loader",
            query: {
                esModule: false,
                name: "[name].[ext]?[hash]"
            }
        }
        ]
    },
    target: "electron-renderer",
    plugins: [
        new webpack.DefinePlugin({
            'process.browser': 'true'
        }),
        new HtmlWebpackPlugin({
            template: "src/html/index.html",
            inject: false
        }),
        new BomPlugin(true, /\.(js|jsx)$/),
        new CopyWebpackPlugin([
            {
                from: path.resolve("src", "assets"),
                to: path.resolve("dist/html", "assets")
            },
            {
                from: path.resolve("src", "locales"),
                to: path.resolve("dist/html", "locales")
            },
            {
                from: path.resolve("src", "html"),
                to: path.resolve("dist/html")
            },
            {
                from: path.resolve("src", "package.json"),
                to: path.resolve("dist", "package.json")
            }
        ])
    ]
},
{
    mode: "development",
    entry: ['babel-polyfill', "./src/main/index.js"],
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist/",
        filename: "app.bundle.js"
    },
    target: "electron-main",
    module: {
        exprContextCritical: true,
        wrappedContextCritical: true,
        wrappedContextRecursive: true,
        wrappedContextRegExp: /^\.\//,
        exprContextRegExp: /^\.\//,
        unknownContextRegExp: /^\.\//,
        rules: [{
            test: /\.(js|jsx)$/,
            loader: "babel-loader",
            include: [path.resolve(__dirname, "src/main")],
            query: {
                presets: ["@babel/env", "@babel/react"]
            },
            exclude: [/node_modules/]
        }, {
            test: /\.node$/,
            use: "node-loader"
        }]
    },
    externals: {
        serialport: "commonjs serialport",
        "usb-detection": "commonjs usb-detection"
    },
    resolve: {
        modules: [path.resolve("./node_modules")]
    },
    plugins: [
        new webpack.DefinePlugin({
            $dirname: "__dirname"
        })
    ],
    node: {
        __dirname: false
    }
}
];