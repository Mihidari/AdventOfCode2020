const getInput = require("../injectInput")

const resolve = (input) => {
    input.sort((a,b) => a-b)
    let jolt1 = 1, jolt3 = 1
    for(let i = 0; i < input.length-1; i++) {
        if((input[i+1] - input[i]) === 1) jolt1++
        if((input[i+1] - input[i]) === 3) jolt3++
    }
    return jolt1 * jolt3
    
}

(async () => {
    const input = await getInput(Number)
    console.log(resolve(input))
})()
