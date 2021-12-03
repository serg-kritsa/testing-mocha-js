exports.addCallback = function (a, b, callback) {
    setTimeout(() => {
        return callback(null, a + b);
    }, 500);
}