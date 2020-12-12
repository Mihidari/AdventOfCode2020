const getInput = require("../injectInput")

const degreesToDirection = (degrees, w, dir) => {
    d = Math.abs(degrees)/90
    while(d > 0) {
        if(dir === "L") {
            let newWaypoint={'N': w['E'], 'E': w['S'], 'S': w['W'], 'W': w['N']}
            w = newWaypoint
        }
        if(dir === "R") {
            let newWaypoint={'N': w['W'], 'E': w['N'], 'S': w['E'], 'W': w['S']}
            w = newWaypoint
        }
        d--
    }
    return w
}

const resolve = (input) => {
    let shipDist = {'N':0, 'E':0, 'S':0, 'W':0}
    let waypointDist = {'N':1, 'E':10, 'S':0, 'W':0}
    for(let i=0; i < input.length; i++) {
        let key = input[i][0]
        let value = +input[i].substring(1)
        switch (key) {
            case 'L':
                waypointDist = degreesToDirection(value, waypointDist, key)
                break
            case 'R':
                waypointDist = degreesToDirection(value, waypointDist, key)
                break
            case 'F':
                for(let key in shipDist){
                    shipDist[key]+= value*waypointDist[key]
                }
                break
            default:
                waypointDist[key]+=value
        }
    }
    return (Math.abs(shipDist["S"] - shipDist["N"]) + Math.abs(shipDist['E'] - shipDist['W']))
}

(async () => {
    const input = await getInput(String)
    console.log(resolve(input))
})()
