const getInput = require("../injectInput")

const resolve = (input) => {

    const id = []

    for(let v of input) {
        const row = v.substring(0, 7)
        const column = v.substring(7)
        const rangeRow = [0, 127]
        const rangeColumn = [0, 7]

        for(let letter of row) {
            if(letter === "F") rangeRow[1] -= Math.ceil((rangeRow[1]- rangeRow[0])/2)
            if(letter === "B") rangeRow[0] += Math.ceil((rangeRow[1]- rangeRow[0])/2)
        }

        for(let letter of column) {
            if(letter === "L") rangeColumn[1] -= Math.ceil((rangeColumn[1]- rangeColumn[0])/2)
            if(letter === "R") rangeColumn[0] += Math.ceil((rangeColumn[1]- rangeColumn[0])/2)
        }

        id.push(rangeRow[0] * 8 + rangeColumn[0])
    }

    id.sort()

    for(let i = 0; i < id.length; i++) {
        if(id[i] !== id[i+1] - 1) return id[i+1]-1
    }
}


(async () => {
    const input = await getInput(String)
    console.log(resolve(input))
})()