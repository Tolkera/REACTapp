const fs = require('fs');
const path = require('path');
const users = require('../controllers/users');
const auth = require('./auth');
const pluckData = require('../utilities/pluck-data').user;
const tasks = require('../controllers/tasks');
const categories = require('../controllers/categories');

module.exports = function(app, dir) {

    app.post('/api/users', users.createUser );
    app.put('/api/users', users.updateUser );
    app.get('/logout', function(req, res){
        req.logout();
        res.send({success: true});
    });

    app.post('/api/tasks', tasks.createTask);
    app.get('/api/tasks', tasks.getTasks);
    app.put('/api/tasks/:id', tasks.updateTask);
    app.delete('/api/tasks/:id', tasks.deleteTask);

    app.post('/api/categories', categories.createCategory);
    app.get('/api/categories', categories.getCategories);
    app.put('/api/categories/:id', categories.updateCategory);
    app.delete('/api/categories/:id', categories.deleteCategory);

    app.post('/api/login', auth.authenticate);

    app.get('*', (req, res) => {
        var userData = null;
        if (req.user) {
            userData = JSON.stringify(pluckData(req.user))
        }
        let fileContents;

        fs.readFile(path.join(dir, 'public/main.html'), 'utf-8', (err, file)=>{
            if (err) throw err;
            fileContents = file.replace("UserData", userData);
            res.send(fileContents);
        });
    });
};