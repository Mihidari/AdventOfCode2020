const getInput = require("../injectInput")

const resolve = (input, n) => {
    input = input[0].split(',').map(Number)
    let fq = {}, prev = input[0], current
    for(let i=1; i<n; i++) {
        if(!input[i]) current = fq[prev] ? i - fq[prev] : 0
        else current = input[i]
        fq[prev] = i
        prev = current
    }
    return current
}

(async () => {
    const input = await getInput(String)
    console.log("Part1: " +resolve(input, 2020))
    console.log("Part2: " +resolve(input, 30000000))
})()
