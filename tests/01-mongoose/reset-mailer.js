exports.sendPasswordResetEmail = function (email) {
    var body;
    return sendEmail(email, body);
}

function sendEmail(email, body) {
    return new Promise((resolve, reject) => {
        if (!email || !body) {
            return reject(new Error('Invalid input'));
        }
        
        setTimeout(() => {
            console.log('Email Sent!');
            // return reject(new Error('Fake Error'));
            return resolve('Email sent');
        }, 100);
    });
}