const child_process = require('child_process')

async function install(projectDir) {
    const preConfigure = require('./pre-configure')
    const postConfigure = require('./post-configure')
    console.log('Installing Strapux...')
    // pre-configure, and create strapux.config.json
    await preConfigure(projectDir)
    const config = await readJsonFile(`${projectDir}/strapux.config.json`)
    // install nuxt
    await runBashScript('bin/install-nuxt.sh', [projectDir, config.frontend.path])
    // install frontend extra_packages

    // instal strapi
    await runBashScript('bin/install-strapi.sh', [projectDir, config.backend.path])
    // install backend extra_packages

    // post configure
    await postConfigure()
    process.exit(0)
}

// functions
async function runBashCommand(cmd) {
    // console.log('running bash command -', cmd)
    child_process.execSync(cmd)
}
async function runBashScript(script, args) {
    // console.log('running bash script -', script, args.join(' '))
    child_process.execFileSync(script, args, {
        stdio: 'inherit'
    })
}
async function readJsonFile(jsonFile) {
    const loadJsonFile = require('load-json-file');
    return await loadJsonFile(jsonFile)
}
async function saveJsonFile(jsonFile, data) {
    const writeJsonFile = require('write-json-file');
    await writeJsonFile(jsonFile, data)
}

module.exports = {
    install,
    runBashCommand,
    runBashScript,
    readJsonFile,
    saveJsonFile
}
