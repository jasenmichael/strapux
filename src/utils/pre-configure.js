const {
    promisify
} = require('util')
const chalk = require('chalk')
const logSymbols = require('log-symbols')

const copy = promisify(require('ncp').ncp)
const cwd = process.cwd()

module.exports = async function (path) {
    // console.log('Pre-configuring Strapux', path)

    //------todo----
    // install packages???
    // await installPackages()
    // copy default.strapux.config.json
    // copy default.strapux.config.json

    await copy(`${cwd}/node_modules/strapux/config/default.strapux.config.json`, `${cwd}/strapux.config.json`, {
        clobber: false,
    }).then(() => {
        console.log(`  ${chalk.green(`${logSymbols.success}`)} Create strapux.config.json`)
    }).catch(err => {
        return fail(err)
    })
    // END copy default.strapux.config.json
    // END copy default.strapux.config.json


    // configure package.json
    // options
    //  projectName
    //  projectDir
    //  mainRepo
    //  nuxtRepo
    //  nuxt as submodule?
    //  strapiRepo
    //  strapi as submodule?
    //  author
    //  dbType
    //  dbCredentials

    // checkDbAccess
    // rm .git before nuxt and strapi, so can add remote repos

    // const failMsg = 'failed pre-configuring Strapux'
    // return fail(failMsg)

    return {
        success: true
    }
    function fail(errMsg) {
        return {
            success: false,
            error: errMsg
        }
    }
}
