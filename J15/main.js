const getInput = require("../injectInput")

/*
Utilisation de Map à la place d'un objet pour la HashTable ->
de ~286s à ~3.9s
*/

const resolve = (input, n) => {
    input = input[0].split(',').map(Number)
    let fq = new Map(), prev = input[0], current
    for(let i=1; i<n; i++) {
        if(!input[i]) current = fq.get(prev) ? i - fq.get(prev) : 0
        else current = input[i]
        fq.set(prev, i)
        prev = current
    }
    return current
}

(async () => {
    const input = await getInput(String)
    console.log("Part1: " +resolve(input, 2020))
    console.time('TimeP2')
    console.log("Part2: " +resolve(input, 30000000))
    console.timeEnd('TimeP2')
})()
