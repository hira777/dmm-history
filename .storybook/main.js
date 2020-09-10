const path = require('path');

module.exports = {
  stories: ['../chrome/src/react/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: config => {
    // 自前の webpack.config.js と同じ alias を指定
    config.resolve.alias['@'] = path.resolve(__dirname, '../chrome/src/');
    config.resolve.alias['chromeStorage'] = require.resolve('../chrome/src/utils/__mocks__/chromeStorage.ts');
    return config;
  },
};
