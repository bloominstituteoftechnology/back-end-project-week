module.exports = {
  "extends": "airbnb-base",
  "env": {
    "node": true,
    "es6": true,
    "jest": true,
  },
  "rules": {
    "linebreak-style": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "import/no-extraneous-dependencies": 0,
    "arrow-body-style": 0,
    "no-unused-vars": [1 , { "ignoreRestSiblings": true, "argsIgnorePattern": "^_" }],
    "no-shadow": ["warn", {"builtinGlobals": false, "hoist": "functions", "allow": ["resolve", "reject", "done", "cb", "_resultsForDebug"]}]
  }
};
