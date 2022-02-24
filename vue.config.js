
module.exports = {
  devServer: {
    disableHostCheck: true,
    //https: true,
    //port: 8081
  },

  transpileDependencies: ['vuetify'],
  lintOnSave: false,
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
