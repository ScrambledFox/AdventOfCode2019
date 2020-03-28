// FileSystem library.
const fs = require('fs')

// Reading and parsing the line seperated inputs.
let textData = fs.readFileSync("ModuleMass.txt", 'utf8')
const massModules = textData.split(/\r?\n/).map(x => parseInt(x))

// Function for calculating fuel for a specific mass.
function calculateFuelRequirement (mass) {
    return Math.floor(mass / 3) - 2
}


// Main program.
let neededFuel = 0;

// Calculate fuel requirements for each seperate module.
for (let i = 0; i < massModules.length; i++) {
    const moduleMass = massModules[i]
    
    // Start with the mass of the module.
    let mass = moduleMass

    // Do this if we still have positive mass left.
    while (mass > 0) {
        // Calculate fuel mass.
        mass = calculateFuelRequirement(mass)

        // If this mass is greater then zero we can add this to our requirements. Otherwise we can stop this while loop.
        if(mass > 0) neededFuel += mass
    }
}

// Check our results
console.log("After some number crunching, our computers give " + neededFuel + " as the answer.")