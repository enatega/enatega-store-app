// eslint-disable-next-line no-undef
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        { jsxImportSource: "nativewind" },
        "module:metro-react-native-babel-preset",
      ],
      "nativewind/babel",
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          allowUndefined: true,
        },
      ],
    ],
    plugins: ["react-native-reanimated/plugin"],
  };
};
