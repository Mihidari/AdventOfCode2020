const getInput = require("../injectInput")

const isValid = (arr, number) => {
    let hashMap = {}

    for (let i = 0; i < arr.length; i++){
        if (hashMap[arr[i]]) return true
        else hashMap[number - arr[i]] = arr[i]
    }
    return false
}

const contiguous = (arr, number) => {
    let left = 0
    let right = 2
    let sum = 0
    while(sum !== number || right-1 === left) {
        sum = [...arr].slice(left, right).reduce((ac, v) => ac +v)
        sum > number ? left++ : right++
    }
    return [...arr].slice(left, right)
}

const resolve = (input) => {
    for(let i = 25; i < input.length; i++) {
        if(!(isValid([...input].slice((i-25), i), input[i]))) {
            let chain = contiguous([...input].slice(0, i), input[i], i)
            return {
                "part1": input[i],
                "part2" : Math.max(...chain) + Math.min(...chain)
            }
        }
    }
}

(async () => {
    const input = await getInput(Number)
    console.log(resolve(input))
})()

