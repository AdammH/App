module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["module:metro-react-native-babel-preset"],
        plugins: [
            [
                "babel-plugin-inline-import",
                {
                    extensions: [".svg"],
                },
            ],
            'react-native-reanimated/plugin',
            'module:react-native-dotenv'
        ],
    };
};
