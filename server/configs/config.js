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
        db: 'mongodb://ang5user:ang5userp@ds261527.mlab.com:61527/ang-5-app',
        port: process.env.PORT || 80
    }
};