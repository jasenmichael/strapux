const runBashCommand = require('./run-bash-command')
const ora = require('ora')

module.exports = async function (opts) {
    const oneclick = opts.oneclick
    const path = opts.path
    // todo-------------------------------------
    // get package manager
    let successfulStrapiInstall
    if (oneclick) {
        const spinner = ora({
            text: 'Installing Strapi quickstart'
        })
        spinner.start()
        successfulStrapiInstall = await runBashCommand(`create-strapi-app ${path}/strapi --use-npm --no-run --quickstart`, path, true)
            .then(() => spinner.clear().stop())
    } else {
        successfulStrapiInstall = await runBashCommand(`create-strapi-app ${path}/strapi --use-npm --no-run`, path, false)
    }


    if (successfulStrapiInstall.exitCode || successfulStrapiInstall.stderr) {
        return fail(successfulStrapiInstall.stderr)
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
