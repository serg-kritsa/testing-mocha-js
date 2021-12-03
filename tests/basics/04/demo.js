exports.bar = async (fileName) => {
    await exports.createFile(fileName);
    let result = await callDB(fileName); // NOT exported. rewire will be used 

    return result;
}

exports.createFile = (fileName) => {
    console.log('---in createFile')
    //fake create file
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('fake file created');
            return Promise.resolve('done');
        }, 100);
    });
}

function callDB(fileName) {
    console.log('---in callDB')
    //fake call db
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('fake db call');
            resolve('saved');
        }, 100);
    });
}