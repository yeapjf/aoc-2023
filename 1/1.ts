import { readFileSync } from 'fs'

// Object to convert string to digit
const DIGIT_STR: { [key: string]: string } = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    eno: '1',
    owt: '2',
    eerht: '3',
    ruof: '4',
    evif: '5',
    xis: '6',
    neves: '7',
    thgie: '8',
    enin: '9',
}

// Return [PART_1_ANSWER, PART_2_ANSWER]
function getResults(inputPath: string): [number, number] {
    let total1 = 0
    let total2 = 0

    readFileSync(inputPath, 'utf-8')
        .trim()
        .split(/\r?\n/)
        .forEach(l => {
            const firstMatch = l.match(new RegExp(/(\d)/))
            const lastMatch = l.split('').reverse().join('').match(new RegExp(/(\d)/))

            if (firstMatch !== null && lastMatch !== null) {
                total1 += Number(firstMatch[1] + lastMatch[1])
            }
        })

    // Reimport sample for part 2 as it is different
    if (inputPath === 'sample.txt') inputPath = 'sameple-2.txt'
    readFileSync(inputPath, 'utf-8')
        .trim()
        .split(/\r?\n/)
        .forEach(l => {
            const firstMatch = l.match(new RegExp(/(\d|one|two|three|four|five|six|seven|eight|nine)/))
            const lastMatch = l.split('').reverse().join('').match(new RegExp(/(\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/))

            if (firstMatch !== null && lastMatch !== null) {
                let firstDigit = firstMatch[1]
                let lastDigit = lastMatch[1]

                if (firstMatch[1] in DIGIT_STR) firstDigit = DIGIT_STR[firstMatch[1]]
                if (lastMatch[1] in DIGIT_STR) lastDigit = DIGIT_STR[lastMatch[1]]

                total2 += Number(firstDigit + lastDigit)
            }
        })

    return [total1, total2]
}

// Test solution against sample input
const testResults = getResults('sample.txt')
if (testResults[0] !== 142) throw('Test 1 failed, got: ' + testResults[0])
if (testResults[1] !== 281) throw('Test 2 failed, got: ' + testResults[1])

const inputResults = getResults('input.txt')
console.log('Part 1: ' + inputResults[0])
console.log('Part 2: ' + inputResults[1])
