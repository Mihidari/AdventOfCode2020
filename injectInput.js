const fs = require('fs');
const {promisify} = require('util');
const read = promisify(fs.readFile);

const getInput = async (type, file = "./input.txt", separator = '\r\n') => {
    let input = await read(file, 'utf8')
    input = input.split(separator).map(type)
    return input
}

module.exports = getInput