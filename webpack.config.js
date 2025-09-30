const path = require("path");

module.exports = {
  entry: "./src/app.ts",            // 진입점
  output: {
    filename: "bundle.js",          // 결과 파일명
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".ts", ".js"],     // ts, js 확장자 해석
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      }
    ]
  },
  mode: "development"               // 필요시 "production"
};
