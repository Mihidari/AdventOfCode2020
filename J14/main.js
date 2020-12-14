const getInput = require("../injectInput")

const resolve = (input) => {
    let mask
    let memory = {}
    for(let line of input) {
        let [key, value] = line.split(' = ')
        if(key === "mask") {
            mask = value.split('').map((v, i) => [v, i]).filter(v => v[0] != "X")
        }
        else {
            let n = Number(value).toString(2).padStart(36, '0')
            for(let bit of mask) {
                n = n.substring(0, bit[1]) + bit[0] + n.substring(bit[1] + 1);
            }
            memory[key] = parseInt(n, 2)
        }
    }
    let sum = 0
    for(let key in memory) {
        sum+= memory[key]
    }
    return sum
}

(async () => {
    const input = await getInput(String)
    console.log(resolve(input))
})()
