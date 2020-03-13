// Strapux utils
const preConfig = require('./utils/pre-configure')
const installNuxt = require('./utils/install-nuxt')
const installStrapi = require('./utils/install-strapi')
const postConfig = require('./utils/post-configure')
const runBashCommand = require('./utils/run-bash-command')



// runBashCommand
// Depndencies
const VerboseRenderer = require('listr-verbose-renderer')
const Listr = require('listr')
const chalk = require('chalk')
const logSymbols = require('log-symbols');

// install Strapux, assumes from cli
async function install(path, options) {
    // const path = args[0]
    // console.log('options-------', options)
    options = options ? JSON.parse(options) : {}

    // we did mkdir, npm init, npm i stapux via create-strapux-app, or manually
    const tasks = new Listr([{
            title: `${chalk.green(logSymbols.success)} Pre-configure Strapux project`,
            task: async () => {
                await preConfig(path, options).then(res => {
                    if (!res.success) abortInstall(res.error)
                })
            }
        },
        {
            title: `${chalk.green(logSymbols.success)} Install Nuxt`,
            task: async () => {
                await installNuxt(path, options).then(res => {
                    if (!res.success) abortInstall(res.error)
                })
            }
        },
        {
            title: `${chalk.green(logSymbols.success)} Install Strapi`,
            task: async () => {
                await installStrapi(path, options).then(res => {
                    if (!res.success) abortInstall(res.error)
                })
            }
        },
        {
            title: `${chalk.green(logSymbols.success)} Post-configure Strapux project`,
            task: async () => {
                await postConfig(path).then(res => {
                    if (!res.success) abortInstall(res.error)
                })
            }
        }
    ], {
        renderer: VerboseRenderer,
        dateFormat: false,
        collapse: false,
        concurrent: false,
        exitOnError: true
    })
    tasks.run().catch(err => {
        abortInstall(err)
    })
}

async function abortInstall(msg) {
    console.log(`   ${chalk.bold.red('x')} FAIL ERROR:`, msg)
    console.log(`   ${chalk.bold.red('x')} ABORTING...`)
    process.exit(1)
}

module.exports = {
    install
}
