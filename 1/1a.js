const fs = require('fs')

let textData = fs.readFileSync("ModuleMass.txt", 'utf8')
const massModules = textData.split(/\r?\n/).map(m => parseInt(m))

let neededFuel = 0
let totalMass = 0

for (let i = 0; i < massModules.length; i++) {
    totalMass += massModules[i]
    neededFuel += Math.floor(massModules[i] / 3) - 2
}

console.log("The combined mass of " + massModules.length + " modules is " + totalMass + " units, and we'll be needing " + neededFuel + " units of fuel.")