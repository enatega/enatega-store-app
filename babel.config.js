// eslint-disable-next-line no-undef
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        { jsxImportSource: "nativewind" },
        // "module:metro-react-native-babel-preset",
      ],
      "nativewind/babel",
    ],
    // plugins: [
    //   "@babel/plugin-proposal-optional-chaining",
    //   "@babel/plugin-syntax-optional-chaining",
    // ],
  };
};
