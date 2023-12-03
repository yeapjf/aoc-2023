import * as fs from 'fs'

const dir = process.argv[2]

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    fs.copyFile('boilerplate.ts', dir + '/main.ts', () => {})
}
