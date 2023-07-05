const Router = require("@koa/router");
const router = new Router();

const clientRouter = require("./client.routes");
router.use("/api/clients", clientRouter());

module.exports = () => router.routes();