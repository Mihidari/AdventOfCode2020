const getInput = require("../injectInput")

const resolve = (input) => {
    let timestamp = +input[0]
    let bus = []
    for(let value of input[1].split(',')) {
        if(value != "x") bus.push([+value, value - timestamp % value])
    }
    bus.sort((a,b) => a[1] - b[1])
    return bus[0][1] * bus[0][0]
}

(async () => {
    const input = await getInput(String)
    console.log(resolve(input))
})()
