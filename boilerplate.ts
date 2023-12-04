import { readFileSync } from 'fs'

// Return [PART_1_ANSWER, PART_2_ANSWER]
function getResults(inputPath: string): [number, number] {
    let part1 = 0
    let part2 = 0

    readFileSync(inputPath, 'utf-8')
        .trim()
        .split(/\r?\n/)

    return [part1, part2]
}

// Test solution against sample input
const testResults = getResults('sample.txt')
if (testResults[0] !== 0) throw('Test 1 failed, got: ' + testResults[0])
if (testResults[1] !== 0) throw('Test 2 failed, got: ' + testResults[1])

const inputResults = getResults('input.txt')
console.log('Part 1: ' + inputResults[0])
console.log('Part 2: ' + inputResults[1])
