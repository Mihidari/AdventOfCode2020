const fs = require('fs');
const {promisify} = require('util');
const read = promisify(fs.readFile);

const getInput = async (type) => {
    let input = await read('./input.txt', 'utf8')
    input = input.split('\r\n').map(type)
    return input
}

module.exports = getInput