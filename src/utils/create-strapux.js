const VerboseRenderer = require('listr-verbose-renderer')
const Listr = require('listr')
const chalk = require('chalk')
const logSymbols = require('log-symbols')

// Strapux utils
const preConfig = require('./pre-configure')
const installNuxt = require('./install-nuxt')
const installStrapi = require('./install-strapi')
const postConfig = require('./post-configure')

const create = (opts) => {
    // we did mkdir, npm init, npm i stapux via create-strapux-app, or manually
    const tasks = new Listr([{
            title: `${chalk.green(logSymbols.success)} Pre-configure Strapux project`,
            task: async () => {
                await preConfig(opts).then(res => {
                    if (!res.success) abortInstall(res.error)
                })
            }
        },
        {
            title: `${chalk.green(logSymbols.success)} Install Nuxt`,
            task: async () => {
                await installNuxt(opts).then(res => {
                    if (!res.success) abortInstall(res.error)
                })
            }
        },
        {
            title: `${chalk.green(logSymbols.success)} Install Strapi`,
            task: async () => {
                await installStrapi(opts).then(res => {
                    if (!res.success) abortInstall(res.error)
                })
            }
        },
        {
            title: `${chalk.green(logSymbols.success)} Post-configure Strapux project`,
            task: async () => {
                await postConfig(opts).then(res => {
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
    create
}
