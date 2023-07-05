const Router = require("@koa/router");
const { addClient, getAllClients, getClientById, updateClient, deleteClient } = require("../controllers/client.controller");
const router = new Router();

router.get("/", getAllClients);
router.get("/:id", getClientById);
router.post("/", addClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

module.exports = () => router.routes();