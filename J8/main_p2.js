const getInput = require("../injectInput")

const resolve = (input) => {
    let seq = 0
    let acc = 0
    let fix = 0
    let nb = 0
    let history = []
    while(seq < input.length) {
        if(history.includes(seq)) {
            history = []
            acc = 0
            seq = 0
            nb = 0
            fix++
        }
        history.push(seq)
        let [instruction, value] = input[seq].split(' ')
        if(nb === fix) {
            instruction === 'nop' ? instruction = 'jmp' : instruction = 'nop'
        }
        switch (instruction) {
            case 'acc':
                acc+= parseInt(value, 10)
                seq++
                break
            case 'nop':
                seq++
                nb++
                break
            case 'jmp':
                seq+= parseInt(value, 10)
                nb++
                break
        }
    }
    return acc
}


(async () => {
    const input = await getInput(String)
    console.log(resolve(input))
})()
