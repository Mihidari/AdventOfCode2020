const getInput = require("../injectInput")

const degreesToDirection = (degrees) => {
    degrees = (degrees+360) % 360
    let direction = {'0': 'N', '90': 'E', '180': 'S', '270': 'W', '360': 'N'}
    return direction[degrees]
}

const resolve = (input) => {
    let dist = {N:0, E:0, S:0, W:0}
    let degrees = 90
    for(let i=0; i < input.length; i++) {
        let key = input[i][0]
        let value = +input[i].substring(1)
        switch (key) {
            case 'L':
                degrees-=value
                break
            case 'R':
                degrees+=value
                break
            case 'F':
                dist[degreesToDirection(degrees)]+=value
                break
            default:
                dist[key]+=value
        }
    }
    console.log(dist)
    return (Math.abs(dist["S"] - dist["N"]) + Math.abs(dist['E'] - dist['W']))
}

(async () => {
    const input = await getInput(String)
    console.log(resolve(input))
})()
