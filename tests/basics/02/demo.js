exports.addPromise = function (a, b) {
    // return Promise.reject(new Error('fake'))
    return Promise.resolve(a + b)
}