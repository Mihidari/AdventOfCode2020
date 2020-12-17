const getInput = require("../injectInput")

const addFace = (face, cube) => {
    let index = face === 'front' ? 0 : cube.length - 1

    for(let face of cube) {
        face.unshift(".".repeat(face[0].length))
        face.push(".".repeat(face[0].length))
    }

    for(let i=0; i<cube.length;i++) {
        for(let j=0; j<cube[i].length; j++) {
            cube[i][j] = "." + cube[i][j] + "."
        }
    }

    for(let line of cube[index]) {
        if(line !== ".".repeat(cube[index][0].length)) {
            if(face === 'front') cube.unshift([...Array(cube[index][0].length).keys()].map(_ => ".".repeat(cube[index][0].length)))
            else cube.push([...Array(cube[index][0].length).keys()].map(_ => ".".repeat(cube[index][0].length)))
            break
        }
    }
}

const checkAdjacent = (i, j, k, buffer) => {
    let active = 0, inactive = 0
    for(let l=-1; l<2; l++) {
        for(let m=-1; m<2; m++) {
            for(let n=-1; n<2; n++) {
                if(!(l === 0 && m === 0 && n === 0)) {
                    if(i+l >= 0 && j+m >= 0 && k+n >= 0) {
                        if(buffer[i+l]) {
                            if(buffer[i+l][j+m]) {
                                if(buffer[i+l][j+m][k+n] === ".") inactive++
                                if(buffer[i+l][j+m][k+n] === "#") active++
                            }
                        }
                    }
                }
            }
        }
    }
    return {active, inactive}
}

const resolve = (input, n) => {
    let cycle = 0
    let cube = [input], buffer
    while(cycle < n) {

        addFace('front', cube)
        addFace('back', cube)
        buffer = JSON.parse(JSON.stringify(cube))
        for(let i=0; i<cube.length; i++) {
            for(let j=0; j<cube[i].length; j++) {
                for(let k=0; k<cube[i][j].length; k++) {
                    let check = checkAdjacent(i, j, k, buffer)
                    if(cube[i][j][k] === "#" && (check.active < 2 || check.active > 3)) {
                        cube[i][j] = cube[i][j].substring(0, k) + '.' + cube[i][j].substring(k + 1);
                    }
                    else if(cube[i][j][k] === "." && check.active === 3) cube[i][j] = cube[i][j].substring(0, k) + '#' + cube[i][j].substring(k + 1);
                }
            }
        }
        cycle++
    }
    console.log(cube)
    let sum = 0
    for(let z of cube) {
        for(let y of z) {
            for(let x of y) {
                if(x === "#") sum++
            }
        }
    }
    return sum
}

(async () => {
    const input = await getInput(String)
    console.log(resolve(input, 6))
})()
