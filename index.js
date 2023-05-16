const { ExpressServer } = require("./src/config/express.config");
require("dotenv").config();

const server = new ExpressServer();

server.listen();
