const path = require("path");
module.exports = {
  babelPluginImportOptions: {
    libraryDirectory: "es",
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
