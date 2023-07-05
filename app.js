const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const serve = require('koa-static');
const config = require('config');

const mainRouter = require("./routes/index.routes");

const app = new Koa();
app.use(bodyParser());
app.use(cors());
//context => ctx
app.use(serve(__dirname + "/public"));
app.use(mainRouter());

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