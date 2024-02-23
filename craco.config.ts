
export {};

module.exports = {
  webpack: {
    configure: (webpackConfig: any) => {
      // Add a fallback for the 'crypto' module
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify')
      };
      webpackConfig.plugins!.push(
        new (require('webpack').ProvidePlugin)({
          Buffer: ['buffer', 'Buffer']
        })
      );
      return webpackConfig;
    }
  }
};
