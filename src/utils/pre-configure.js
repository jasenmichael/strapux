const {
    promisify
} = require('util')
const chalk = require('chalk')
const logSymbols = require('log-symbols')

const copy = promisify(require('ncp').ncp)

module.exports = async function (path) {
    // console.log('Pre-configuring Strapux', path)
    console.log(`  ${chalk.green(`${logSymbols.success}`)} Init project`)
    console.log(`  ${chalk.green(`${logSymbols.success}`)} Install Strapux node package`)

    // copy default.strapux.config.json
    // copy default.strapux.config.json
    await copy(`${path}/node_modules/strapux/config/default.strapux.config.json`, `${path}/strapux.config.json`, {
        clobber: false,
    }).then(() => {
        console.log(`  ${chalk.green(`${logSymbols.success}`)} Create strapux.config.json`)
    }).catch(err => {
        return fail(err)
    })
    // END copy default.strapux.config.json
    // END copy default.strapux.config.json



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
