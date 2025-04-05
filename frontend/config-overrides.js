const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "util": require.resolve("util/"),
        "zlib": require.resolve("browserify-zlib"),
        "stream": require.resolve("stream-browserify"),
        "url": require.resolve("url/"),
        "crypto": require.resolve("crypto-browserify"),
        "assert": require.resolve("assert/"),
    });
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ]);
    config.ignoreWarnings = [/Failed to parse source map/];
    config.module.rules.push({
        test: /\.(js, mjs, jsx)$/,
        enforce: 'pre',
        use: ['source-map-loader'],
    });
    config.module.rules.push({
        test: /\.(js, mjs, jsx)$/,
        resolve: {
            fullySpecified: false,
        },
    });
    return config;
};