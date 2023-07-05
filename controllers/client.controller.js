const getClients = (ctx) => {
    ctx.body = "Clients";
}

const getClient = (ctx) => {
    ctx.body = "id:" + ctx.params.id;
}

const addClient = (ctx) => {

}

module.exports = {
    getClients,
    getClient,
    addClient
}