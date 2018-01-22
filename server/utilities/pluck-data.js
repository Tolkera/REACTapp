module.exports = {
    user: function(user){
        return {
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            categories: user.categories,
            tasks: user.tasks
        }
    }
};