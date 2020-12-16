const getInput = require("../injectInput")

const resolve = (rules, tickets) => {
    const valid = new Set()
    for(let rule of rules) {
        const [_, range] = rule.split(':')
        const its = range.split(' or ').map(v => v.split('-').map(Number))
        for(let it of its) {
            [ ...Array(it[1] - it[0]+1).keys()].forEach(v => valid.add(v+it[0]))
        }
    }
    let sum = 0
    for(let ticket of tickets) {
        ticket.split(',').map(Number).forEach(v => valid.has(v) ? null : sum+=v)
    }
    return sum
}

(async () => {
    const rules = await getInput(String, './rules.txt')
    const tickets = await getInput(String, './tickets.txt')
    console.log(resolve(rules, tickets))
})()
