const Router = require("@koa/router");
const { getClients, getClient, addClient } = require("../controllers/client.controller");
const router = new Router();

router.get("/", getClients);
router.get("/:id", getClient);
router.post("/", addClient);

module.exports = () => router.routes();