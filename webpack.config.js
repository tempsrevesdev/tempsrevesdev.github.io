const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemovePlugin = require('remove-files-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const COMPILE_MODE = process.env.NODE_ENV
console.log(COMPILE_MODE)

const DELETE_JS_LIST = ['style.js']

const cssConfig = {
  entry: {
    style: './src/scss/style.scss'
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'public', 'css'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
        ]
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: COMPILE_MODE === 'production' ? '../css/[name].min.css' : '../css/[name].css',
    }),
    new RemovePlugin({ // remove extra compilied js files in public/css 移除資料夾裡多餘編譯的 JS 檔案
      watch: {
          root: './public/css',
          include: DELETE_JS_LIST,
          trash: true
      },
      after: {
          root: './public/css',
          include: DELETE_JS_LIST,
          trash: true
      }
    })
  ],
};

const jsConfig = {
  entry: {
    main: './src/js/main.js',
  },
  mode: COMPILE_MODE,
  output: {
    clean: true,
    path: path.resolve(__dirname, 'public', 'js'),
    filename: COMPILE_MODE === 'production' ? '[name].min.js' : '[name].js',
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            include: [
                path.resolve(__dirname, "node_modules/clipboard/src")
            ],
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-class-properties'],
                },
            },
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                        options: {
                        name: '[name].[ext]',
                        outputPath: '../img',
                    }
                }
            ]
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'url-loader', // 處理圖檔轉換 base 64
                options: {
                  limit: 8192,
                  fallback: require.resolve('file-loader'), // 超過尺寸的時候調用 file-loader
                  name: '[name].[ext]',
                },
              },
            ],
        }
    ]
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    // }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'public/index.html'),
      template: './src/index.html',
      inject: false,
      minify: {
        collapseWhitespace: COMPILE_MODE === 'production' ? true : false
      }
    }),
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['public'] }
    },{
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: true
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: false,
      terserOptions: {
        compress: {
          drop_console: true,
        },
        format: {
          comments: false,
        }
      },
    })],
  }
};

module.exports = () => {
  return [cssConfig, jsConfig]
};