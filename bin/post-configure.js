const fs = require("fs")
const {
    runBashCommand,
    runBashScript,
    readJsonFile,
    saveJsonFile
} = require('./strapux')

module.exports = async function () {
    console.log('post-configuring Strapux')
    // --- if .env notExist, copy example.env
    if (!fs.existsSync(path)) {
        runBashCommand(`cp bin/config/strapi/bootstrap.js ${strapiPath}/config/functions/bootstrap.js`)
    }
    // --- run node bin/build-env.js
    runBashCommand(`echo ".env" >> ${strapiPath}/.gitignore`)

    // add .env to .gitingore for backend(nuxt has it included)
    let strapiPath = require('../strapux.config.json').backend.path
    runBashCommand(`echo ".env" >> ${strapiPath}/.gitignore`)

    // if not set - prompt single repo, triple repo, or no repo.
    // prompt user to create project-name repo
}
