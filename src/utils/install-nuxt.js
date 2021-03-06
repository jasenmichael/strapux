const execa = require('execa')
const runBashCommand = require('./run-bash-command')
const ora = require('ora')
const {
    random
} = require('brah')

module.exports = async function (opts) {
    const path = opts.path
    let successfulNuxtInstall
    if (opts.oneclick) {
        // get superb
        let brah = await random()
        brah.charAt(0).toUpperCase() + brah.slice(1)
        // get pkg mngr
        let pkgMgr = 'npm'
        // get usr
        let = user = await execa('npm', ['whoami']).then(res => {
            return res.stdout !== undefined ? res.stdout : ''
        }).catch(err => '')
        // get nuxt path
        const nuxtPath = 'nuxt'
        const spinner = ora({
            text: 'Installing Nuxt from template'
        })
        spinner.start()
        successfulNuxtInstall = await execa.command(`${path}/node_modules/strapux/src/scripts/create-nuxt-app-answers.sh ${nuxtPath} ${brah} ${user} ${pkgMgr}`, {
            cwd: path,
            stdio: 'ignore'
        })
        spinner.clear().stop()

    } else { // run with prompts
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
