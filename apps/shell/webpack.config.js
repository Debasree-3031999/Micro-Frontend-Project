const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

// Check if we're building for production (Vercel) or development (localhost)
const isProduction = process.env.NODE_ENV === "production";

// Remote app URLs — change these to your actual Vercel URLs after deploying remotes
const REMOTE_URLS = {
  restaurant: isProduction
    ? "https://foodie-restaurent.vercel.app"
    : "http://localhost:3001",
  cart: isProduction
    ? "https://foodie-cart-orcin.vercel.app"
    : "http://localhost:3002",
};

module.exports = {
  entry: "./src/index.ts",
  mode: isProduction ? "production" : "development",

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",  // "auto" lets Webpack figure out the correct URL in any environment
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  // ─── INGREDIENT 3: Loaders ───
  // "Webpack, here's how to handle different file types"
  // Same for EVERY React + TypeScript project. Copy-paste this.
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
  // ─── INGREDIENT 4: Module Federation ── THIS IS THE ONLY UNIQUE PART!
  plugins: [
    // ============================================
    // MODULE FEDERATION PLUGIN — HOST CONFIGURATION
    // ============================================
    // This is the core of micro frontend architecture.
    // The Shell app acts as the HOST — it loads other apps at runtime.
    new ModuleFederationPlugin({
      
      // Unique name for this app in the federation
      name: "shell",

      // REMOTES: Other micro frontend apps this host can load.
      // Format: "internalName": "remoteName@URL/remoteEntry.js"
      // - "internalName" is how you import it: import('restaurant/App')
      // - "remoteName" must match the remote's ModuleFederationPlugin `name`
      // - The URL points to where the remote's remoteEntry.js is served
      remotes: {
        restaurant: `restaurant@${REMOTE_URLS.restaurant}/remoteEntry.js`,
        cart: `cart@${REMOTE_URLS.cart}/remoteEntry.js`,
      },

      // SHARED: Dependencies that should be loaded ONCE across all micro frontends.
      // Without this, each micro frontend would bundle its own copy of React,
      // which wastes bandwidth AND breaks React hooks (hooks crash with 2+ React instances).
      shared: {
        // "Share these, don't duplicate"
        react: {
          singleton: true, // Only ONE copy of React on the page
          requiredVersion: "^18.3.1",
          eager: true, // Load immediately (host should eager-load shared deps)
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^18.3.1",
          eager: true,
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: "^6.28.0",
        },
      },
    }),
    // ─── INGREDIENT 5: HTML Plugin ───
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      publicPath: "/",
    }),
  ],

  devServer: {
    port: 3000,
    historyApiFallback: true, // Support React Router's client-side routing
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow cross-origin requests for Module Federation
    },
  },
};
