'use strict'
const fs = require('fs')

// Read wire layout
let rawData = fs.readFileSync("WireLayout.txt", 'utf8').split(/\r?\n/)
let wireAData = rawData[0].split(',')
let wireBData = rawData[1].split(',')

// Instruction class
class Instruction {
    constructor(d, n) {
        this.direction = d
        this.steps = n
    }
}

// 2d vector class
class Vector2 {
    constructor(x, y){
        if(x != null){
            this.x = x
        } else {
            this.x = 0
        }

        if(y != null){
            this.y = y
        } else {
            this.y = 0
        }
    }
}

// Grid node
class GridNode {
    constructor(wireA, wireB){
        this.wireA = wireA
        this.wireB = wireB
    }
}

// Variables we use for computation.
const headStart = 2000

let wireAHead = new Vector2(headStart, headStart)
let wireAInstructions = new Array()
let wireBHead = new Vector2(headStart, headStart)
let wireBInstructions = new Array()

let grid = new Array()
let distances = new Array()


// Program

// Transform instruction string to instruction object.
function translateInstruction(instructionString){
    let instruction = new Instruction()
    instruction.direction = instructionString.charAt(0)
    instruction.steps = parseInt(instructionString.slice(1, instructionString.length))

    return instruction
}

// Sanitising input.
for (let i = 0; i < wireAData.length; i++) {
    wireAInstructions.push(translateInstruction(wireAData[i]))
}

for (let i = 0; i < wireBData.length; i++) {
    wireBInstructions.push(translateInstruction(wireBData[i]))
}

// Populating grid with data.
for (let i = 0; i < wireAInstructions.length; i++) {
    let instruction = wireAInstructions[i]

    for (let s = 0; s < instruction.steps; s++) {
        switch (instruction.direction) {
            case 'R':
                wireAHead.x++
                break;
            case 'D':
                wireAHead.y--
                break;
            case 'L':
                wireAHead.x--
                break;
            case 'U':
                wireAHead.y++
                break;
            default:
                break;
        }

        if (grid[wireAHead.x] === undefined) {
            grid[wireAHead.x] = new Array()
        }

        if (grid[wireAHead.x][wireAHead.y] === undefined) {
            grid[wireAHead.x][wireAHead.y] = new GridNode()
        }

        grid[wireAHead.x][wireAHead.y].wireA = true
    }    
}

for (let i = 0; i < wireBInstructions.length; i++) {
    const instruction = wireBInstructions[i]
    for (let s = 0; s < instruction.steps; s++) {
        switch (instruction.direction) {
            case 'R':
                wireBHead.x++
                break;
            case 'D':
                wireBHead.y--
                break;
            case 'L':
                wireBHead.x--
                break;
            case 'U':
                wireBHead.y++
                break;
            default:
                break;
        }

        if (grid[wireBHead.x] === undefined) {
            grid[wireBHead.x] = new Array()
        }

        if (grid[wireBHead.x][wireBHead.y] === undefined) {
            grid[wireBHead.x][wireBHead.y] = new GridNode()
        }

        grid[wireBHead.x][wireBHead.y].wireB = true
        
    }    
}

// Getting intersections.
let intersections = []

for (let x = 0; x < grid.length; x++) {
    if(grid[x] === undefined){
        continue
    }

    for (let y = 0; y < grid[x].length; y++) {
        if(grid[x][y] === undefined){
            continue
        }

        if (grid[x][y].wireA == true && grid[x][y].wireB == true) {
            intersections.push(new Vector2(x, y))
        }
    }
}

// Getting distances.
for (let i = 0; i < intersections.length; i++) {
    const intersection = intersections[i];
    distances.push(Math.abs(headStart - intersection.x) + Math.abs(headStart - intersection.y))
}

// Printing distances.
distances.sort(function(a, b){return a - b})
console.log(distances)