const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://dictionary.iachieved.it/dictionary',
      changeOrigin: true,
    })
  );
};