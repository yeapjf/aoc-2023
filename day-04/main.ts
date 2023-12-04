import { readFileSync } from 'fs'

// Return [PART_1_ANSWER, PART_2_ANSWER]
function getResults(inputPath: string): [number, number] {
    let part1 = 0
    let part2 = 0

    const numberOfCards: { [key: number]: number } = {}

    readFileSync(inputPath, 'utf-8')
        .trim()
        .split(/\r?\n/)
        .forEach((line, index) => {
            line = line.replace(/Card.*\d+:/, '')
            const [winningNumbersString, myNumbersString] = line.split('|')

            const winningNumbers = Array.from(winningNumbersString.matchAll(/(\d+)/g))
                .map(e => e[1])
                .map(Number)

            let totalMatches = 0
            Array.from(myNumbersString.matchAll(/(\d+)/g))
                .map(e => e[1])
                .map(Number)
                .forEach(myNumber => {
                    if (winningNumbers.includes(myNumber)) {
                        totalMatches++
                    }
                })

            // Part 1
            const cardTotal = totalMatches ? Math.pow(2, totalMatches - 1) : 0
            part1 += cardTotal

            // Part 2
            numberOfCards[index] ??= 1
            if (totalMatches) {
                [...Array(totalMatches).keys()].map(i => i + index + 1).forEach(i => {
                        numberOfCards[i] ??= 1
                        numberOfCards[i] += numberOfCards[index]
                    })
            }
        })

    part2 = Object.values(numberOfCards).reduce((partialSum, a) => partialSum + a, 0)
    return [part1, part2]
}

// Test solution against sample input
const testResults = getResults('sample.txt')
if (testResults[0] !== 13) throw('Test 1 failed, got: ' + testResults[0])
if (testResults[1] !== 30) throw('Test 2 failed, got: ' + testResults[1])

const inputResults = getResults('input.txt')
console.log('Part 1: ' + inputResults[0])
console.log('Part 2: ' + inputResults[1])
