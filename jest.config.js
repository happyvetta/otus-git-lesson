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
        outputPath: "./jest-html-report/report.html",
      },
    ],
  ],
  testMatch: ["**/tests/**"],
};
