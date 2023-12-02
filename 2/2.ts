
import { readFileSync } from 'fs'

// Limits for part 1
const RED_LIMIT = 12
const GREEN_LIMIT = 13
const BLUE_LIMIT = 14

// Return [PART_1_ANSWER, PART_2_ANSWER]
function getResults(inputPath: string): [number, number] {
    let total1 = 0
    let total2 = 0

    readFileSync(inputPath, 'utf-8')
        .trim()
        .split(/\r?\n/)
        .forEach((line) => {
            const gameNumber = line.match(new RegExp(/^Game (\d+): /))
            const redCounts = Array.from(line.matchAll(new RegExp(/(\d+) red/g)))
            const greenCounts = Array.from(line.matchAll(new RegExp(/(\d+) green/g)))
            const blueCounts = Array.from(line.matchAll(new RegExp(/(\d+) blue/g)))

            // Part 1
            if (
                redCounts.every(e => Number(e[1]) <= RED_LIMIT) &&
                greenCounts.every(e => Number(e[1]) <= GREEN_LIMIT) &&
                blueCounts.every(e => Number(e[1]) <= BLUE_LIMIT)
            ) {
                if (gameNumber !== null) {
                    total1 += Number(gameNumber[1])
                }
            }

            // Part 2
            let redMax = 0
            redCounts.forEach(e => {
                if (Number(e[1]) > redMax) {
                    redMax = Number(e[1])
                }
            })

            let greenMax = 0
            greenCounts.forEach(e => {
                if (Number(e[1]) > greenMax) {
                    greenMax = Number(e[1])
                }
            })

            let blueMax = 0
            blueCounts.forEach(e => {
                if (Number(e[1]) > blueMax) {
                    blueMax = Number(e[1])
                }
            })

            const power = redMax * greenMax * blueMax
            total2 += power
        })

    return [total1, total2]
}

// Test solution against sample input
const testResults = getResults('sample.txt')
if (testResults[0] !== 8) throw('Test 1 failed, got: ' + testResults[0])
if (testResults[1] !== 2286) throw('Test 2 failed, got: ' + testResults[1])

const inputResults = getResults('input.txt')
console.log('Part 1: ' + inputResults[0])
console.log('Part 2: ' + inputResults[1])
