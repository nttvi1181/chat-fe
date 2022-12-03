module.exports = {
  parser: "@babel/eslint-parser",
  settings: {
    "import/resolver": {
      alias: {
        map: [
          // And all your import aliases
          ["@components", "./src/components"],
          ["@page", "./src/page"],
          ["@hooks", "./src/hooks"],
          ["@redux", "./src/redux"],
          ["@assets", "./src/assets"],
          ["@images", "./src/assets/images"],
          ["@icons", "./src/assets/icons"],
        ],
        extensions: [".ts", ".js", ".jsx", ".json"],
      },
    },
  },
};
