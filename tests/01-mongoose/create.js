const User = require('./models/user');

const mailer = require('./create-mailer');

exports.create = function (data) {
    if (!data || !data.email || !data.name) {
        return Promise.reject(new Error('Invalid arguments'));
    }

    var user = new User(data);

    return user.save().then((result) => {
        return mailer.sendWelcomeEmail(data.email, data.name).then(() => {
            return {
                message: 'User created',
                userId: result.id
            };
        });
    }).catch((err) => {
        return Promise.reject(err);
    });
}