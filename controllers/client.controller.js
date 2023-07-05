const getClients = (ctx) => {
    ctx.body = "Clients";
}

const getClient = (ctx) => {
    ctx.body = "id:" + ctx.params.id;
}

const addClient = (ctx) => {
    console.log(ctx.request.body);
    ctx.status = 201;
    ctx.body = ctx.request.body;
}

module.exports = {
    getClients,
    getClient,
    addClient
}