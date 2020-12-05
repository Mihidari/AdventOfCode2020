const getInput = require("../injectInput")

const divide = (range) => Math.ceil((range[1]- range[0])/2)

const resolve = (input) => {

    const id = []

    for(let v of input) {
        const row = v.substring(0, 7)
        const column = v.substring(7)
        const rangeRow = [0, 127]
        const rangeColumn = [0, 7]

        for(let letter of row) {
            letter === "F" ? rangeRow[1] -= divide(rangeRow) : rangeRow[0] += divide(rangeRow)
        }

        for(let letter of column) {
            letter === "L" ? rangeColumn[1] -= divide(rangeColumn) : rangeColumn[0] += divide(rangeColumn)
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