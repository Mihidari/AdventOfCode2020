const getInput = require("../injectInput")

const resolve = (input) => {
    let seq = 0
    let acc = 0
    let history = []
    while(true) {
        if(history.includes(seq)) return acc
        history.push(seq)
        let [instruction, value] = input[seq].split(' ')
        switch (instruction) {
            case 'acc':
                acc+= parseInt(value, 10)
                seq++
                break
            case 'nop':
                seq++
                break
            case 'jmp':
                seq+= parseInt(value, 10)
                break
        }
    }
}


(async () => {
    const input = await getInput(String)
    console.log(resolve(input))
})()
