// babel-preset-expo (SDK 54+) auto-registers react-native-worklets/plugin when the
// package is installed. Do NOT add it here again or Reanimated logs a duplicate-plugin warning.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
  };
};
