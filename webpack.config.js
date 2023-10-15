import TerserPlugin from 'terser-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

export default {
  mode: 'production',
  entry: './loader.js',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'README.md' },
        { from: 'modal.css' }
      ]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  },
  output: {
    filename: 'modal.min.js'
  }
};
