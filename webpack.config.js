const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === "development";

  return {
    entry: {
      index: "./src/pages/wiki/index.js"
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
          test: /\.(sa|sc|c)ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: true,
                reloadAll: true
              }
            },
            {
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
    devtool: isDevelopment ? "#eval-source-map" : false,
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      port: 3000,
      stats: {
        children: false,
        maxModules: 0
      },
      historyApiFallback: {
        index: "/index.html/"
      },
      openPage: "/"
    },
    plugins: [
      new CleanWebpackPlugin({ root: path.join(__dirname, "dist") }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/pages/wiki/wiki.pug"
      }),
      require("autoprefixer"),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
        ignoreOrder: false
      }),
      new BundleAnalyzerPlugin()
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
