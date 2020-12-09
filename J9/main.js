const getInput = require("../injectInput")

const isValid = (arr, number) => {
    let hashMap = {}

    for (let i = 0; i < arr.length; i++){
        if (hashMap[arr[i]]) return true
        else hashMap[number - arr[i]] = arr[i]
    }
    return false
}

const resolve = (input) => {
    for(let i = 25; i < input.length; i++) {
        if(!(isValid([...input].slice((i-25), i), input[i]))) return input[i]
    }
}

(async () => {
    const input = await getInput(Number)
    console.log(resolve(input))
})()

