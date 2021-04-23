const path = require('path');
const externals = require( './externals' );

module.exports = [
    {
    entry: './src/index.js', // Where to find our main js
    output: {
      filename: 'index.build.js',
      path: path.resolve(__dirname, 'build')
    },
      module: {
      rules:
        [{
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['transform-class-properties',[ "@wordpress/babel-plugin-makepot", {
              "output": "languages/redlum_amimatedblocks.pot"
            } ]]
          }
        }]
    },
    mode: 'production',
    externals: externals,
  },
  {
    entry: './animation_lib/entrypoint.js',
    output: {
      filename: 'entrypoint.build.js',
      path: path.resolve(__dirname, 'build')
    },
    module: {
      rules:
        [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['transform-class-properties']
            }
          },
          {
            test: /\.s[ac]ss$/i,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          }
        ]
    },
    mode: 'production'
  },
];
