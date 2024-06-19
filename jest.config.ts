export default {
    "preset": "ts-jest",
    "testEnvironment": "jsdom",
    "transform": {
      "^.+\\.(t|j)sx?$": "ts-jest",
      "^.+\\.(ts|tsx|js|jsx)$": "babel-jest"
    },
    "testMatch": [
      "**/__test__/**/?(*.)+(spec|test).[jt]s?(x)"
    ],
    "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"],
    "moduleDirectories": ["node_modules", "src"],
    "transformIgnorePatterns": [
      "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"
    ],
    "collectCoverage": true,
    coverageDirectory: './reports/coverage',
    "coverageReporters": [
      "json", 
      "html",
      "json-summary", 
      "text",
      "lcov"
    ],
    "collectCoverageFrom": [
      "src/**",
      "!src/index.ts"
    ],
    "coverageThreshold": {
      // "global": {
      //   "branches": 85,
      //   "functions": 85,
      //   "lines": 85,
      //   "statements": 85
      // }
    },
  "reporters": [
    "default",
    ["jest-html-reporters", 
      {
        "publicPath": "./reports/html",
        "filename": "index.html",
        "expand": true
      }
    ],
    ["jest-junit",
        {
            "outputDirectory": "reports/junit",
            "outputName": "jest-junit.xml",
            "ancestorSeparator": " › ",
            "uniqueOutputName": "false",
            "suiteNameTemplate": "{filepath}",
            "classNameTemplate": "{classname}",
            "titleTemplate": "{title}"
        }
    ]
  ]
};
  