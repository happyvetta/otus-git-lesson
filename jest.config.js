module.exports = {
  transformIgnorePatterns: ["node_modules/(?!(sucrase)/)"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx|mjs)$": "babel-jest",
  },
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        publicPath: "./jest-html-report",
        filename: "report.html",
      },
    ],
  ],
};
