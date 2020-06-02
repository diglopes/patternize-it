const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");

const prodPlugins = [];
if (process.env.NODE_ENV === "production") {
  prodPlugins.push(
    new OptimizeCssPlugin({
      cssProcessor: require("cssnano"),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
      canPrint: true,
    })
  );
}

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    ...prodPlugins,
    new HtmlWebpackPlugin({
      template: "./main.html",
      hash: "true",
    }),
    new ExtractTextWebpackPlugin("styles.css"),
  ],
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        }),
      },
    ],
  },
};
