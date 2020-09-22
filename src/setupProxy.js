`const proxy = require("http-proxy-middleware");

/**
 * 代理
 * @param app
 */
module.exports = function (app) {
    app.use("/admin", proxy.createProxyMiddleware({
            target: "http://localhost:9003",
            changeOrigin: true,
            pathRewrite: {
                "^/api": ""
            }
        })
    );
};
`
