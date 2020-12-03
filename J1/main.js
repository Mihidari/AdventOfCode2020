const getInput = require("../injectInput")

const resolve  = (input) => {
    for(let i=0; i < input.length; i++) {
        for(let j=0; j < input.length; j++) {
            for(let k=0; k < input.length; k++) {
                if(input[i] + input[j] + input[k] === 2020) return input[i] * input[j] * input[k]
            }
        }
    }
}

(async () => {
    const input = await getInput(Number)
    console.log(resolve(input))
})()