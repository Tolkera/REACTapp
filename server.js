const express = require('express');
const path = require('path');
const http = require('http');

var env = process.env.NODE_ENV = process.env.NODE_ENV || "dev";

var config = require('./server/configs/config')[env];

const app = express();

const server = http.createServer(app);

require('./server/configs/express')(app, config);
require('./server/configs/mongoose')(config);
require('./server/configs/passport')();
require('./server/configs/routes')(app, __dirname);


server.listen(config.port, () => console.log(`API running on localhost: ${config.port}`));

