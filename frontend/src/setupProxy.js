const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // app.use(
  //   "/api",
  //   createProxyMiddleware({
  //     target: "https://localhost:5000",
  //     secure: false,
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   "/socket.io",
  //   createProxyMiddleware({
  //     target: "https://localhost:4001",
  //     secure: false,
  //     changeOrigin: true,
  //   })
  // );
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://medsos-backend66.herokuapp.com",
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    "/socket.io",
    createProxyMiddleware({
      target: "https://medsos-backend66.herokuapp.com:4001",
      secure: false,
      changeOrigin: true,
    })
  );
};
