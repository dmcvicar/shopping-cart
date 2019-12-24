const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/api",
    proxy({
      target: "http://shopping-cart-backend:8000",
      changeOrigin: true
    })
  );
};
