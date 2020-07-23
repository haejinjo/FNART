const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    publicPath: '/build/',
    // In dev mode,
    // Proxy requests for certain API routes to PORT 3000, our Express backend domain
    proxy: {
      '/api/': 'http://localhost:3000',
      '/user/': 'http://localhost:3000',
    },
  },
  module: {
    rules: [
      // 1. RULE FOR JSX/JS FILES
      {
        // Specify file extensions we want current rule to "test" for (or target)
        test: /.(js|jsx)$/,
        // Babel should not be run on node_modules, because they don't require transpilation
        exclude: /node_modules/,
        // Specify any loaders you want to use + associated options
        // Can chain loaders by including more UseEntry objects in our `use` array below:
        use: [
          // Convert JS supersets/newer versions to ES5 vanilla JS
          {
            // Specify which loader NPM module we want to use for the target files
            loader: 'babel-loader',
            // Include any options to configure the parser for this module
            options: {
              // Include babel presets for React=>vanilla JS and ES6=>ES5 transpilation
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      }, // end of rule 1
      // 2. RULE FOR SASS/SCSS FILES
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          // 3. Inject CSS into the DOM 
          {
            loader: 'style-loader',
          },
          // 2. Convert CSS to CommonJS
          {
            loader: 'css-loader',
          },
          // 1. Convert SASS/SCSS to CSS
          {
            loader: 'sass-loader',
          },
        ],
      }, // End of rule 2
      // 3. RULE FOR BOOTSTRAP CSS FILE
      {
        test: /\.css$/,
        use: [
          // 2. Inject CSS into the DOM 
          {
            loader: 'style-loader',
          },
          // 1. Convert CSS to CommonJS
          {
            loader: 'css-loader',
          },
        ],
      }, // End of rule 3
    ], // End of rules array
  }, // End of module 
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
}