const getInput = require("../injectInput")

const resolve = (input) => {
    let ans = []
    let j = 0
    ans[j] = ''
    for(let i = 0; i < input.length; i++) {
        if(input[i] !== '') {
            ans[j] += input[i] + ' '
        } else {
            j++
            ans[j] = ''
        }
    }

    let sum = 0
    for(let v of ans) {
        let words = v.split(' ')

        for(let i = 97; i <= 122; i++) {
            let test = true
            for(let word of words) {
                if(word !== ''){
                    if(!word.includes(String.fromCharCode(i))) {
                        test = false
                    }
                }
            }
            if(test) sum ++
        }
    }
    return sum
}

(async () => {
    const input = await getInput(String)
    console.log(resolve(input))
})()