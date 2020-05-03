const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === "development";

  return {
    entry: {
      index: "./src/pages/main/index.js",
      wiki: "./src/pages/wiki/index.js"
    },
    output: {
      filename: "[name].bundle.js",
      path: path.join(__dirname, "dist")
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: "pug-loader"
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ["babel-loader", "eslint-loader"]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          // Apply rule for .sass, .scss or .css files
          test: /\.(sa|sc|c)ss$/i,

          // Set loaders to transform files.
          // Loaders are applying from right to left(!)
          // The first loader will be applied after others
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: true,
                reloadAll: true
              }
            },
            {
              // This loader resolves url() and @imports inside CSS
              loader: "css-loader",
              options: {
                importLoaders: 2,
                sourceMap: true
              }
            },
            {
              loader: "resolve-url-loader"
            },
            {
              // First we transform SASS to standard CSS
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        },

        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ["file-loader"]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: ["file-loader"]
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"]
        }
      ]
    },
    devtool: isDevelopment ? "#eval-source-map" : "source-map",
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      port: 3000,
      stats: {
        children: false,
        maxModules: 0
      },
      openPage: ["/", "/about"]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/pages/main/index.pug",
        chunks: ["index"]
      }),
      new HtmlWebpackPlugin({
        filename: "wiki/index.html",
        template: "./src/pages/wiki/wiki.pug",
        chunks: ["wiki"]
      }),
      new HtmlWebpackPugPlugin(),
      require("tailwindcss"),
      require("autoprefixer"),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
        ignoreOrder: false
      })
    ],
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            safe: true
          }
        })
      ],
      splitChunks: {
        chunks: "all"
      }
    },
    performance: {
      hints: process.env.NODE_ENV === "production" ? "warning" : false
    }
  };
};
