const getInput = require("../injectInput")

const checkAdjacent = (seatY, seatX, model) => {
    let empty = 0, occupied = 0
    for(let i=seatY-1; i < seatY+2; i++) {
        for(let j=seatX-1; j < seatX+2; j++) {
            if(!(i === seatY && j === seatX)) {
                if(i >= 0 && j >= 0 && i < model.length && j < model[i].length) {
                    if(model[i][j] === "L") empty++
                    if(model[i][j] === "#") occupied++
                }
            }
        }
    }
    return {empty, occupied}
}

const resolve = (input) => {
    let change = true

    for(let i=0; i < input.length; i++) {
        input[i] = input[i].split('')
    }

    while(change) {
        change=false
        let buffer = JSON.parse(JSON.stringify(input));
        for(let i=0; i < input.length; i++) {
            for(let j=0; j < input[i].length; j++) {
                let check = checkAdjacent(i, j, input)
                if(input[i][j] === "L") {
                    if(check.occupied === 0) {
                        buffer[i][j] = "#"
                        change=true
                    }
                } else if(input[i][j] === "#") {
                    if(check.occupied > 3) {
                        buffer[i][j] = "L"
                        change=true
                    }
                }
            }
        }
        input = JSON.parse(JSON.stringify(buffer));
    }

    let count = 0
    for(let i=0; i < input.length; i++) {
        for(let j=0; j < input[i].length; j++) {
            if(input[i][j] === '#') count++
        }
    }

    return count
}

(async () => {
    const input = await getInput(String)
    console.log(resolve(input))
})()
