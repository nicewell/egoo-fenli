module.exports = {
  devServer: {
    host: '127.0.0.1',
    port: 8989,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          // '^/api': '/'
        }
      }
    }
  }
}
