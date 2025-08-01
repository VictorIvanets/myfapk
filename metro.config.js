const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  transformer: {
    experimentalImportSupport: false,
    unstable_transformProfile: 'hermes-stable',
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
