module.exports = {
  publicPath : './',
  devServer: {
    port: 4009,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4002'
      }
    }
  },
  productionSourceMap: false
}