const getInput = require("../injectInput")

const resolve = (input) => {
    input.sort((a,b) => a-b)
    let jolt1 = 1, jolt3 = 1
    let tribo = [1, 1, 2, 4, 7, 13, 24, 44, 81]
    let sequence = [], buffer = [0]
    let result = 1
    for(let i = 0; i < input.length; i++) {
        buffer.push(input[i])
        if((input[i+1] - input[i]) === 1){
            jolt1++
        } else {
            sequence.push(buffer)
            buffer = []
        }
        if((input[i+1] - input[i]) === 3) jolt3++
    }

    for(let arr of sequence) {
        result*= tribo[arr.length-1]
    }

    return {
        "part1": jolt1 * jolt3,
        "part2": result
    }
}

(async () => {
    const input = await getInput(Number)
    console.log(resolve(input))
})()
