const getInput = require("../injectInput")

const resolve = (input) => {
    let passport = []
    let j = 0
    passport[j] = ''
    for(let i = 0; i < input.length; i++) {
        if(input[i] !== '') {
            passport[j] += input[i] + ' '
        } else {
            j++
            passport[j] = ''
        }
    }

    const regex = /(?=.*hcl)(?=.*eyr)(?=.*pid)(?=.*byr)(?=.*iyr)(?=.*hgt)(?=.*ecl)/
    const eyeColor = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
    let valid = 0
    let check = true
    for(let val of passport) {
        if(regex.test(val)) {
            check = true
            let byr = +val.match(/byr:\s*(\S+)/)[1]
            let iyr = +val.match(/iyr:\s*(\S+)/)[1]
            let eyr = +val.match(/eyr:\s*(\S+)/)[1]
            let hgt = val.match(/hgt:\s*(\S+)/)[1]
            let unit = hgt.match(/[a-zA-Z]+(\^-?[0-9]+)?/)
            if(unit !== null) unit = unit[0]
            hgt = +hgt.match(/\d+/)[0]
            let hcl = val.match(/hcl:\s*(\S+)/)[1]
            let ecl = val.match(/ecl:\s*(\S+)/)[1]
            let pid = val.match(/pid:\s*(\S+)/)[1]

            if(!(byr >= 1920 && byr <= 2002)) check = false

            if(!(iyr >= 2010 && iyr <= 2020)) check = false

            if(!(eyr >= 2020 && eyr <= 2030)) check = false

            if(unit === "cm") {
                if(!(hgt >= 150 && hgt <= 193)) check = false
            } else if (unit === "in") {
                if(!(hgt >= 59 && hgt <= 76)) check = false
            } else {
                check = false
            }
            if(/#\w{6}/.test(hcl) === false) check = false

            if(eyeColor.includes(ecl) === false) check = false

            if(!(pid.length === 9)) check = false

            if(check) valid++
        }
    }
    return valid
}

(async () => {
    const input = await getInput(String)
    console.log(resolve(input))
})()