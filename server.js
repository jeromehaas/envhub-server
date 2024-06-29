// IMPORTS
const Koa = require('koa');
const bodyParser = require('koa-parser');
const dotenv = require('dotenv');
const cors = require('@koa/cors');
const printer = require('./middlewares/printer.middleware.js');

// CREATE ROUTER
const router = require('./routes/index.js');

// CREATE APP
const app = new Koa();
const port = 4000;

// ENABLE CORS
app.use(cors({
	allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));

// SETUP DOTENV
dotenv.config();

// SETUP BODYPARSER
app.use(bodyParser());

// RUN PRINTER
app.use(printer);

// SETUP ROUTER
app.use(router.routes());

// START SERVER
app.listen(port, () => {
	console.log(`🚀 Server is running on port ${ port }!`);
});
