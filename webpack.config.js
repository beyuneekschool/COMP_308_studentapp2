const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require('dotenv-webpack');
const deps = require("./package.json").dependencies;
const path = require('path');

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production';

  const publicPath = isProduction
    ? 'https://comp308-studentapp2.netlify.app/' 
    : 'http://localhost:4000/';

  return {
    output: {
      publicPath: publicPath,
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 4000,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'public'),
      },
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "studentapp2",
        filename: "remoteEntry.js",
        remotes: {
          studentapp1: isProduction
            ? 'studentapp1@https://comp308-studentapp1.netlify.app/remoteEntry.js'
            : 'studentapp1@http://localhost:3000/remoteEntry.js',
        },
        exposes: {},
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
      new Dotenv()
    ],
  };
};
