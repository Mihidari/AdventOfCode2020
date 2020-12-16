const getInput = require("../injectInput")

const resolve = (rules, myTicket, tickets) => {
    const valid = new Set()
    const details = {}
    const rName = []
    myTicket = myTicket[0].split(',').map(Number)
    for(let rule of rules) {
        const [name, range] = rule.split(':')
        rName.push(name)
        details[name] = []
        const its = range.split(' or ').map(v => v.split('-').map(Number))
        for(let it of its) {
            [...Array(it[1] - it[0]+1).keys()].forEach(v => {
                valid.add(v+it[0])
                details[name].push(v+it[0])
            })
        }
    }


    let validTickets = []
    for(let i=0;i<tickets.length;i++) {
        validTickets.push(tickets[i].split(',').map(Number))
    }

    for(let i=0;i<tickets.length;i++) {
        let n = tickets[i].split(',').map(Number)
        for(let j=0; j<n.length; j++) {
            if(!valid.has(n[j])) {
                validTickets[i] = "invalid"
                break
            }
        }
    }
    validTickets = validTickets.filter(v => v!='invalid')

    let row = []
    for(let i=0;i<validTickets[0].length;i++) {
        row[i] = []
        for(let j=0; j<validTickets.length;j++) {
            row[i].push(validTickets[j][i])
        }
    }

    let canBe = []
    for(let i=0; i < row.length; i++) {
        canBe[i] = rName
        for(let key in details) {
            for(let j=0; j<row[i].length; j++) {
                if(!details[key].includes(row[i][j])) {
                    canBe[i] = canBe[i].filter(v => v!=key)
                    break
                }
            }
        }
    }

    let order = {}
    while( Object.keys(order).length < myTicket.length) {
        for(let i=0; i<canBe.length; i++) {
            if(canBe[i].length === 1) {
                let x = canBe[i][0]
                order[i] = canBe[i][0]
                for(let j=0; j<canBe.length; j++) {
                    canBe[j] = canBe[j].filter(v => v!=x)
                }
                break
            }
        }
    }
    let sum = 1
    for(let key in order) {
        if(order[key].includes('departure')) sum*=myTicket[+key]
    }
    return sum
}

(async () => {
    const rules = await getInput(String, './rules.txt')
    const myTicket = await getInput(String, './myTicket.txt')
    const tickets = await getInput(String, './tickets.txt')
    console.log(resolve(rules, myTicket, tickets))
})()
