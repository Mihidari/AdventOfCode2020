const getInput = require("../injectInput")

const resolve =  (input, right, down) => {
    let h = 0
    let w = 0
    let tree = 0

    while(h < input.length-1) {
        w+=right
        h+=down
        if(w > input[h].length - 1) w = w - input[h].length
        if(input[h][w] === "#") tree++
    }
    return tree
}

(async () => {
    const input = await getInput(String)
    console.log(resolve(input,1,1) * resolve(input,3,1) * resolve(input,5,1) * resolve(input,7,1) * resolve(input,1,2))
})()