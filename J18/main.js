const getInput = require("../injectInput")

const parse = (num, i) => {
    let op = ''
    let buffer = 0
    while(i < num.length) {
        if(num[i] === '(') {
            i++
            let par = parse(num, i)
            i = par.i+1
            par = par.buffer
            if(op === '') buffer = par
            else {
                buffer= op === 'add'? buffer + +par : buffer * +par
            }
            continue
        }
        else if(num[i] === ')') return {buffer, i}

        if(num[i] === '+'){
            op ='add'
        }
        else if(num[i] === '*') {
            op ='factor'
        }
        else {
            if(buffer == 0) {
                buffer= +num[i]
            } else {
                buffer= op === 'add'? buffer + +num[i] : buffer * +num[i]
            }
            op = ''
        }
    i++
    }
    return buffer
}

const resolve = (input) => {
    let sum = 0
    for(let line of input) {
        let num = line.split('')
        num = num.filter(v => v!=' ')
        sum+=parse(num, 0)
    }
    return sum
}


(async () => {
    const input = await getInput(String)
    console.log(resolve(input))
})()
