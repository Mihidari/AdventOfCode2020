const getInput = require("../injectInput")

const resolve = (input) => {
    let mask
    let memory = {}
    for(let line of input) {
        let [key, value] = line.split(' = ')
        if(key === "mask") {
            mask = value
        }
        else {
            let adress = Number(key.match(/\d+/)[0]).toString(2).padStart(36, '0').split('')
            let bit = []
            for(let i = 0; i < mask.length; i++) {
                if(mask[i] == '1') adress[i] = mask[i];
                if(mask[i] == 'X') {
                    bit.push(i)
                    adress[i] = '0'
                }
            }
            let i = 1
            while(i <= bit.length) {
                memory[adress.join('')] = value
                if(adress[bit[bit.length - i]] == '0') {
                    adress[bit[bit.length - i]] = '1'
                    i = 1
                } else if (adress[bit[bit.length - i]] == '1') {
                    adress[bit[bit.length - i]] = '0'
                    i++
                }
            }
        }
    }
    let sum = 0
    for(let key in memory) {
        sum+= +memory[key]
    }
    return sum
}

(async () => {
    const input = await getInput(String)
    console.log(resolve(input))
})()
