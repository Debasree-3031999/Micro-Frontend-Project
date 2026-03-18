const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.ts",
  mode: isProduction ? "production" : "development",

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    // ============================================
    // MODULE FEDERATION PLUGIN — REMOTE CONFIGURATION
    // ============================================
    // This app acts as a REMOTE — it exposes components
    // that the host (Shell) can load at runtime.
    new ModuleFederationPlugin({
      // Unique name — must match what the host uses in `remotes` config
      name: "restaurant",

      // FILENAME: The manifest file that the host downloads to discover
      // what this remote exposes. The host fetches:
      // http://localhost:3001/remoteEntry.js
      filename: "remoteEntry.js",

      // EXPOSES: Components this remote makes available to the host.
      // Key './App' means the host imports it as: import('restaurant/App')
      // Value './src/App' points to the actual file in this project.
      exposes: {
        "./App": "./src/App",
      },

      // SHARED: Same as the host — ensures React is loaded only once.
      // Note: remotes should NOT use `eager: true` — only the host should.
      // Remotes use the host's eagerly-loaded copy of React.
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^18.3.1",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^18.3.1",
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: "^6.28.0",
        },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
      publicPath: "/",
    }),
  ],

  devServer: {
    port: 3001,
    historyApiFallback: true,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
