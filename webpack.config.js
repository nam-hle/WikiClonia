const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === "development";

  return {
    entry: ["./src/index.jsx", "./src/scss/main.scss", "./src/pug/index.pug"],
    output: {
      // filename: "bundle.js",
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
          test: /\.scss$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    devtool: isDevelopment ? "#eval-source-map" : "source-map",
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      port: 3000,
      stats: {
        children: false, // Hide children information
        maxModules: 0 // Set the maximum number of modules to be shown
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/pug/index.pug"
      }),
      new HtmlWebpackPugPlugin(),
      require("tailwindcss"),
      require("autoprefixer"),
      new MiniCssExtractPlugin({
        filename: "main.css"
      })
    ],
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            safe: true
          }
        })
      ]
    },
    performance: {
      hints: process.env.NODE_ENV === "production" ? "warning" : false
    }
  };
};
