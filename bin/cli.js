#!/usr/bin/env node

const {
    strapuxInstall,
    runBashCommand
} = require('./strapux')
const env = getEnv()


function getEnv() {
    let config = {
        workingDir: process.cwd(),
    }
    // check if install via npx
    if (process.argv[3] === "--install-from-npx" && process.argv[2]) {
        config.projectName = process.argv[2]
        config.projectDir = `${config.workingDir}/${config.projectName}`
        return config
        // install from project directory
    } else {
        config.projectName = process.argv[1].replace('/bin/cli.js', '').split('/').pop()
        config.projectDir = config.workingDir
        return config
    }
}
console.log('workingDir', env.workingDir)
console.log('projectName', env.projectName)
console.log('projectDir', env.projectDir)

// install from npx or use --install
if ((process.argv[3] === "--install-from-npx") || (process.argv[2] === "--install")) {
 install()
}

async function install() {
    await strapuxInstall(env.projectDir)
    runBashCommand('rm package-lock.json')
}
