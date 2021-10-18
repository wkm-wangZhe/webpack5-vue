module.exports = {
    root: true,
    env: {
        browser: true
    },
    plugins: ['vue'],
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended', // eslint-plugin-vue推荐的适用于vue3的规则预设
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
   
    }
  }