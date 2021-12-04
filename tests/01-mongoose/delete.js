const User = require('./models/user');

exports.delete = function (id) {
    if (!id) {
        return Promise.reject(new Error('Invalid id'));
    }

    return User.remove({
        _id: id
    });
}