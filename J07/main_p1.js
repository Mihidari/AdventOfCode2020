const getInput = require("../injectInput")

const resolve = (input) => {

    const graph = {}

    for(let rule of input) {
        let [conteneur, contenus] = rule.split('contain')
        conteneur = conteneur.match(/.+?(?= bags| bag)/)[0]
        graph[conteneur] = []
        contenus = contenus.split(',')

        for(let contenu of contenus) {
            let number = contenu.match(/[0-9]/)
            if(!(number === null)) {
                let color = contenu.match(/[a-zA-Z\s]+?(?= bags| bag)/)[0].trim()
                graph[conteneur].push([+number[0], color])
            }
        }
    }

    let toCheck = ["shiny gold"]
    let result = 0
    let find = true
    while(find === true) {
        let lng = toCheck.length
        for(let color in graph) {
            for(let contenu of graph[color]) {
                if(toCheck.includes(contenu[1])) {
                    if(!(toCheck.includes(color))) {
                        toCheck.push(color)
                        result++
                    }
                }
            }
        }
        if(lng === toCheck.length) find = false
    }

    return result
}

(async () => {
    const input = await getInput(String)
    console.log(resolve(input))
})()
