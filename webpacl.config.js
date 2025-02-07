const { withExpoWebpack } = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await withExpoWebpack(env, argv);

  // Add CSS loaders if not already present
  config.module.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  });

  return config;
};
