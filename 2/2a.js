const fs = require('fs')

let intcode = []
const target = 19690720

let pointer = 0

function resetInput (n, v) {
    let rawData = fs.readFileSync('Intcode.txt', 'utf8')
    intcode = rawData.split(',').map(x => parseInt(x))

    intcode[1] = n
    intcode[2] = v

    pointer = 0
}

function processOpCode(o, a, b, c) {
    switch (o) {
        case 1:
            intcode[c] = intcode[a] + intcode[b]
            pointer += 4
            break;
        case 2:
            intcode[c] = intcode[a] * intcode[b]
            pointer += 4
            break;
        case 99:
            return true;
        default:
            break;
    }
}

for (let n = 0; n < 99; n++) {
    for (let v = 0; v < 99; v++) {
        resetInput(n, v)
        
        while (pointer < intcode.length) {            
            if(processOpCode(intcode[pointer], intcode[pointer + 1], intcode[pointer + 2], intcode[pointer + 3])){ 
                break
            }
        }

        if (intcode[0] == target){
            console.log("Correct answer is " + (100 * n + v))
            break
        }
    }
}

