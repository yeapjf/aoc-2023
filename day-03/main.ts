import { readFileSync } from 'fs'

// Return [PART_1_ANSWER, PART_2_ANSWER]
function getResults(inputPath: string): [number, number] {
    let total1 = 0
    let total2 = 0

    const allNumbers: { value: string, row: number, col: number }[] = []
    const allSymbols: { [row: number]: number[] } = {}

    const allGears: { row: number, col: number }[] = []
    const allNumbers2: { [row: number]: { value: string, cols: number[] }[] } = {}

    readFileSync(inputPath, 'utf-8')
        .trim()
        .split(/\r?\n/)
        .forEach((line, index) => {
            const numberMatches = line.matchAll(new RegExp(/\d+/g))
            const symbolMatches = line.matchAll(new RegExp(/[^\d.]/g))
            const gearMatches = line.matchAll(new RegExp(/[*]/g))

            for (const numberMatch of numberMatches) {
                allNumbers.push({ value: numberMatch[0], row: index, col: numberMatch.index ?? 0 })

                const possibleCols = [...Array(numberMatch[0].length + 2).keys()].map(i => i + numberMatch.index ?? 0 - 1)
                allNumbers2[index] ||= []
                allNumbers2[index].push({ value: numberMatch[0], cols: possibleCols })
            }

            for (const symbolMatch of symbolMatches) {
                allSymbols[index] ||= []
                allSymbols[index].push(symbolMatch.index ?? 0)
            }

            for (const gearMatch of gearMatches) {
                allGears.push({ row: index, col: gearMatch.index ?? 0 })
            }
        })

    // Part 1
    for (const number of allNumbers) {
        const possibleRows = [...Array(3).keys()].map(i => i + number.row - 1)
        const possibleCols = [...Array(number.value.length + 2).keys()].map(i => i + number.col - 1)

        for (const row of possibleRows) {
            if (allSymbols[row]) {
                const intersection = allSymbols[row].filter(col => possibleCols.includes(col))
                if (intersection.length) {
                    total1 += Number(number.value)
                }
            }
        }
    }

    // Part 2
    for (const gear of allGears) {
        const possibleRows = [...Array(3).keys()].map(i => i + gear.row - 1)

        let numIntersection = 0
        let numbers: number[] = []

        for (const row of possibleRows) {
            if (allNumbers2[row]) {
                for (const data of allNumbers2[row]) {
                    const intersection = data.cols.includes(gear.col)
                    if (intersection) {
                        numIntersection++
                        numbers.push(Number(data.value))
                    }
                }
            }
        }

        if (numIntersection === 2) {
            total2 += numbers[0] * numbers[1]
        }
    }

    return [total1, total2]
}

// Test solution against sample input
const testResults = getResults('sample.txt')
if (testResults[0] !== 4361) throw('Test 1 failed, got: ' + testResults[0])
if (testResults[1] !== 467835) throw('Test 2 failed, got: ' + testResults[1])

const inputResults = getResults('input.txt')
console.log('Part 1: ' + inputResults[0])
console.log('Part 2: ' + inputResults[1])
