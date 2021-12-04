const mailer = require('./mailer');

exports.resetPassword = function (email) {
    if (!email) {
        return Promise.reject(new Error('Invalid email'));
    }

    //some operations

    return mailer.sendPasswordResetEmail(email);
}