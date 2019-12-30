// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react', // Jest でテストするために利用（https://jestjs.io/docs/en/tutorial-react#setup-without-create-react-app）
    '@babel/preset-typescript'
  ]
};
