const Koa = require('koa');
const config = require('config');

const app = new Koa();
//context => ctx

app.use(ctx => {
    // console.log(ctx.req.headres);
    ctx.body = "Salom Koa"
})

function start() {
    try {
        const PORT = config.get("port") || 3030;
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}
start();