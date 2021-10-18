const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const ESLintPlugin = require('eslint-webpack-plugin')
function resolve(dir) {
	console.log('dir', dir)
    console.log(path.join(__dirname, dir))
	return path.join(__dirname, dir)
}

module.exports = {
	entry: [path.resolve(__dirname, '../src/main.js')],
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'static/js/app.js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['.web.js', '.mjs', '.js', '.json', '.vue'],
		alias: {
			'@': resolve('../src'),
		},
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					transformAssetUrls: {
						video: ['src', 'poster'],
						source: 'src',
						img: 'src',
						image: ['xlink:href', 'href'],
						use: ['xlink:href', 'href'],
					},
				},
				// options: vueLoaderConfig
			},
          
			{
				test: /\.(js|jsx)$/i,
				exclude: /node_modules/,
				include: [resolve('../src')],
                use: ['babel-loader'],

                // options: {
                //     babelrc: true,
                //     cacheDirectory: true, // 启用缓存
                // },
			},
			{
				test: /\.(css|less|scss|sass)$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
			},
            {
                test: /\.(png|jpeg|jpg|gif|svg)(\?.*)?$/,
                exclude: /node_modules/,
				include: [resolve('../src')],
                type: 'asset',
                parser: {
                  dataUrlCondition: {
                    maxSize: 10 * 1024
                  }
                }
            },
            {
                test: /\.(woff|eot|ttf)$/,
                exclude: /node_modules/,
				include: [resolve('../src')],
                type: 'asset',
                parser: {
                  dataUrlCondition: {
                    maxSize: 10 * 1024
                  }
                }
            }
		],
	},
	plugins: [
		new VueLoaderPlugin(),
        new ESLintPlugin({
            exclude: '/node_modules/',
            extensions: ['js', 'vue'],
            // 自动修复。
            // 自从eslint推出--fix命令后，如果觉得eslint格式化规则已经够用的话，其实也可以不用prettier了。
            fix: true,
        }),
	],
}
