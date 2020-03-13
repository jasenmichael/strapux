var fs = require("fs");
const execa = require('execa')
const runBashCommand = require('./run-bash-command')
const ora = require('ora')

module.exports = async function (path, options) {
    console.log('path========='. path)
    let successfulNuxtInstall
    if (options.oneclick == true) {
        const spinner = ora({
            text: 'Installing Nuxt from template'
        })
        spinner.start()
        successfulNuxtInstall = await execa.command(`${path}/node_modules/strapux/src/scripts/create-nuxt-app-answers.sh nuxt`, {
            cwd: path,
            stdio: 'ignore'
        })
        spinner.clear().stop()
        // run with prompts
    } else {
        successfulNuxtInstall = await runBashCommand(`create-nuxt-app ${path}/nuxt`, path, false)
    }


    if (successfulNuxtInstall.exitCode || successfulNuxtInstall.stderr) {
        return fail(successfulNuxtInstall.stderr)
    }
    
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
