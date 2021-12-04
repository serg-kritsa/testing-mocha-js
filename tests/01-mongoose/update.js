const User = require('./models/user');

const mailer = require('./mailer');

exports.update = async function (id, data) {
    try {
        var user = await User.findById(id);

        for (var prop in data) {
            user[prop] = data[prop];
        }

        var result = await user.save();

        return result;
    } catch (err) {
        // console.warn(err);
        return Promise.reject(err);
    }
}