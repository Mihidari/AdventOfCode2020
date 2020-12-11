const getInput = require("../injectInput")

//Part2 [Degueulasse éditon]
const checkFirst = (seatY, seatX, model) => {
    let left = seatX, right = seatX, up = seatY, down = seatY
    let foundLeft = false, foundRight = false, foundUp = false, 
    foundDown = false, foundLU = false, foundLD = false, foundRU = false, foundRD = false
    let empty = 0, occupied = 0
    const check = (Y, X) => {
        if(Y >=0 && X >= 0 && Y < model.length && X < model[0].length)
        if(model[Y][X] === "#") {
            occupied++
            return true
        } else if (model[Y][X] === "L") {
            empty++
            return true
        } else {
            return false
        }
    }
    while(left >=0 || right < model[0].length || up >=0 || down < model.length) {
        left--
        right++
        up--
        down++
        if(!foundLeft) foundLeft=check(seatY, left)
        if(!foundRight) foundRight=check(seatY, right)
        if(!foundUp) foundUp=check(up, seatX)
        if(!foundDown) foundDown=check(down, seatX)
        if(!foundLU) foundLU=check(up, left)
        if(!foundLD) foundLD=check(down, left)
        if(!foundRU) foundRU=check(up, right)
        if(!foundRD) foundRD=check(down, right)
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
                let check = checkFirst(i, j, input)
                if(input[i][j] === "L") {
                    if(check.occupied === 0) {
                        buffer[i][j] = "#"
                        change=true
                    }
                } else if(input[i][j] === "#") {
                    if(check.occupied > 4) {
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
