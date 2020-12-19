const getInput = require("../injectInput")

const resolve_part1  = (input) => {
    let correctPass = 0
    for(let i = 0; i < input.length; i++) {
        const [policy, pass] = input[i].split(': ')
        const [number, letter] = policy.split(' ')
        let [min, max] = number.split('-')
        let buffer = 0

        for(let char of pass) {
            if(char === letter) buffer ++
        }

        if(buffer >= +min && buffer <= +max) correctPass++
    }
    return correctPass
}

const resolve_part2  = (input) => {
    let correctPass = 0
    for(let i = 0; i < input.length; i++) {
        const [policy, pass] = input[i].split(': ')
        const [number, letter] = policy.split(' ')
        let [min, max] = number.split('-')
        let buffer = 0

        for(let j=0; j < pass.length; j++) {
            if(((j+1) === +min) || ((j+1) === +max)) {
                if(pass[j] === letter) buffer++
            }
        }
        if(buffer === 1) correctPass++
    }
    return correctPass
}

(async () => {
    const input = await getInput(String)
    console.log(resolve_part2(input))
})()