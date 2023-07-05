const Router = require("@koa/router");
const router = new Router();

const clientRouter = require("./client.routes");
router.use("/api/client", clientRouter());

module.exports = () => router.routes();