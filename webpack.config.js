// React source path : 'src/main/jsx'
// MainPage and Page1Page.jsx build
// Result of build files == 'src/main/webapp/js/react/[page name].bundle.js

const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src/main/jsx'),
    entry: {
        app: './AppPage.jsx',
        main: './MainPage.jsx',
        home: './Page1Page.jsx'
    },
    devtool: 'sourcemaps',
    cache: true,
    output: {
        path: __dirname,
        filename: './src/main/webapp/js/react/[name].bundle.js'
    },
    mode: 'none',
    module: {
        rules: [ {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        }, {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }]
    }
}