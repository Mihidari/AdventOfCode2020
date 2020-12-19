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

    const helper  = (toCheck) => {
        let sum = 1
        if(graph[toCheck].length > 0) {
            for(let inside of graph[toCheck]) {
                sum+= inside[0] * helper(inside[1])
            }
            return sum
        } else if(graph[toCheck].length === 0) {
            return 1
        }
    }

    let result = helper("shiny gold")

    return result-1
}

(async () => {
    const input = await getInput(String)
    console.log(resolve(input))
})()
