const path = require('path');
const rootPath = path.normalize(__dirname + "/../..");

module.exports = {
    dev: {
        rootPath: rootPath,
        db: 'mongodb://localhost/ang',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        db: process.env.db,
        port: process.env.PORT || 80
    }
};