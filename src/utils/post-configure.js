const {
    promisify
} = require('util')
const fs = require('fs')
const chalk = require('chalk')
const logSymbols = require('log-symbols')
const access = promisify(fs.access)
const prependFile = require('prepend-file')
const replace = require('replace-in-file')

const readJson = require('./read-write-json').read
const writeJson = require('./read-write-json').write
const copy = promisify(require('ncp').ncp)
// const cwd = process.cwd()

const runBashCommand = require('./run-bash-command')


module.exports = async function (opts) {
    // const oneclick = opts.oneclick
    const path = opts.path
    // TEMP
    // await copy(`/home/me/dev/test-old/new-strapux-app/nuxt`, `${path}/nuxt`)
    // await copy(`/home/me/dev/test-old/new-strapux-app/strapi`, `${path}/strapi`)


    // add dotenv to nuxt/nuxt.config.js
    // add dotenv to nuxt/nuxt.config.js
    const nuxtConfig = `${path}/nuxt/nuxt.config.js`
    try {
        await access(nuxtConfig, fs.constants.R_OK);
    } catch (err) {
        return fail(err)
    }
    await prependFile(nuxtConfig, `require('dotenv').config()\n`, (err) => {
        if (err) {
            return fail(err)
        }
        console.log(`  ${chalk.bold(`${logSymbols.success}`)} Add dotenv to Nuxt`)
        console.log(`  ${chalk.blue.bold(`${logSymbols.info}`)} Modified: nuxt/nuxt.config.js`)
    })
    // END add dotenv to nuxt/nuxt.config.js
    // END add dotenv to nuxt/nuxt.config.js


    // add dotenv to strapi/config/functions/bootstrap.js
    // add dotenv to strapi/config/functions/bootstrap.js
    const bootstrapFile = `${path}/strapi/config/functions/bootstrap.js`
    try {
        await access(bootstrapFile, fs.constants.R_OK)
    } catch (err) {
        return fail(err)
    }

    await replace({
            files: bootstrapFile,
            from: `module.exports = () => {};`,
            to: `require('dotenv').config({\n  path: require('find-config')('.env')\n});\n\nmodule.exports = () => {};`,
        })
        .then(() => {
            console.log(`  ${chalk.bold(`${logSymbols.success}`)} Add dotenv to Strapi`)
            console.log(`  ${chalk.blue.bold(`${logSymbols.info}`)} Modified: strapi/config/functions/bootstrap.js`)
        })
        .catch(error => {
            return fail(error)
        })
    // END add dotenv to strapi/config/functions/bootstrap.js
    // END add dotenv to strapi/config/functions/bootstrap.js


    // add scripts to package.json from default.strapux.scripts.json
    // add scripts to package.json from default.strapux.scripts.json
    // check access default.strapux.scripts.json
    const defaultScriptsJsonFile = `${path}/node_modules/strapux/config/default.strapux.scripts.json`
    try {
        await access(defaultScriptsJsonFile, fs.constants.R_OK)
    } catch (err) {
        return fail(err)
    }

    // check access and file exist package.json
    const pkgJsonFile = `${path}/package.json`
    try {
        await access(pkgJsonFile, fs.constants.R_OK);
    } catch (err) {
        return fail(err)
    }

    // add default scripts to package.json
    const defaultScripts = await readJson(defaultScriptsJsonFile)
    const pkg = await readJson(pkgJsonFile)
    pkg.scripts = defaultScripts
    await writeJson(pkgJsonFile, pkg)
    console.log(`  ${chalk.bold(`${logSymbols.success}`)} Add default package.json scripts`)
    // END add scripts to package.json from default.strapux.scripts.json
    // END add scripts to package.json from default.strapux.scripts.json

    // add .env to strapi .gitignore
    // add .env to strapi .gitignore
    await fs.appendFile(`${path}/strapi/.gitignore`, '\n#added by Strapux install\n.env', function (err) {
        if (err) {
            fail(err)
        }
    })
    console.log(`  ${chalk.green(`${logSymbols.success}`)} Add .env to strapi/.gitignore`)
    // END add .env to strapi .gitignore
    // END add .env to strapi .gitignore


    // copy db folders
    // copy db folders
    await copy(`${path}/node_modules/strapux/config/db/`, `${path}/db`, {
        clobber: false,
    }).then(() => {
        console.log(`  ${chalk.green(`${logSymbols.success}`)} Create db folder`)
    }).catch(err => {
        return fail(err)
    })
    // END copy db folders
    // END copy db folders


    // copy default.gitignore
    // copy default.gitignore
    await copy(`${path}/node_modules/strapux/config/default.gitignore`, `${path}/.gitignore`, {
        clobber: false,
    }).catch(err => {
        return fail(err)
    })
    // END copy default.gitignore
    // END copy default.gitignore


    //  generate env from strapi settings and template
    //  generate env from strapi settings and template
    const defaultEnvFile = await fs.readFileSync(`${path}/node_modules/strapux/config/default.env`).toString().split("\n")
    const dbConfig = await readJson(`${path}/strapi/config/environments/development/database.json`)
    const dbSettings = Object.keys(dbConfig.connections.default.settings)

    let newEnvFile = []
    defaultEnvFile.forEach(defaultEnv => {
        let dbEnv = defaultEnv.split('=')[0].replace('DATABASE_NAME', 'DATABASE_DATABASE').replace('STRAPI_DEVELOPMENT_DATABASE_', '').toLowerCase()
        let newEnv = dbConfig.connections.default.settings[`${dbEnv}`]
        if (newEnv) {
            newEnvFile.push(`STRAPI_DEVELOPMENT_DATABASE_${dbEnv.toUpperCase()}=${newEnv}`.replace('DATABASE_DATABASE', 'DATABASE_NAME'))
        } else {
            newEnvFile.push(defaultEnv)
        }
    })

    try {
        newEnvFile.forEach(env => {
            fs.appendFileSync('.env', `${env}\n`, err => {
                if (err) {
                    fail(err)
                }
            })
        })
    } catch (err) {
        fail(err)
    }
    console.log(`  ${chalk.green(`${logSymbols.success}`)} Copy default Strapux .env`)
    console.log(`  ${chalk.green(`${logSymbols.success}`)} Add Strapi db settings to Strapux .env`)
    //  END generate env from strapi settings and template
    //  END generate env from strapi settings and template


    // copy environment database.json
    // copy environment database.json
    require('dotenv').config()
    const dbType = (dbSettings.client === 'sqlite' || 'postgress' || 'mysql') ? 'sql' : 'mongo'
    const environments = ['development', 'staging', 'production']
    for (i in environments) {
        let environment = environments[i]
        copy(`./node_modules/strapux/config/strapi/${dbType}.database.json`, `strapi/config/environments/${environment}/database.json`, {
            clobber: true,
            // stopOnErr: true,
            // dereference: true,
            // errs: true
        }, err => {
            if (err) {
                fail(err)
            }

        })
    }
    console.log(`  ${chalk.green(`${logSymbols.success}`)} Configured database to use .env`)
    console.log(`  ${chalk.blue.bold(`${logSymbols.info}`)} Modified: strapi/config/environments/**/database.json`)
    // copy environment database.json
    // copy environment database.json


    // install strapi and nuxt extra packages
    // install strapi and nuxt extra packages
    /////////////////////////////////////////////////////////////////////////////////////
    // todo get pkg manager
    const strapuxConfig = await readJson(`${path}/strapux.config.json`)
    const nuxtPackages = strapuxConfig.frontend.extra_packages.join(' ')
    const nuxtPath = strapuxConfig.frontend.path
    const strapiPackages = strapuxConfig.backend.extra_packages.join(' ')
    const strapiPath = strapuxConfig.backend.path
    await runBashCommand(`npm i ${nuxtPackages}`, `${path}/${nuxtPath}`, true)
        .then(() => {
            console.log(`  ${chalk.green(`${logSymbols.success}`)} Install Nuxt extra packages`)
            console.log(`  ${chalk.blue.bold(`${logSymbols.info}`)} Installed: ${nuxtPackages}`)
        })
        .catch(err => fail(err))
    await runBashCommand(`npm i ${strapiPackages}`, `${path}/${strapiPath}`, true)
        .then(() => {
            console.log(`  ${chalk.green(`${logSymbols.success}`)} Install Strapi extra packages`)
            console.log(`  ${chalk.blue.bold(`${logSymbols.info}`)} Installed: ${strapiPackages}`)
        })
        .catch(err => fail(err))
    // install strapi and nuxt extra packages
    // install strapi and nuxt extra packages


    //------todo----
    // add envs only via install and re-configure
    // after install nuxt and strapi
    // init nuxt and strapi
    // init main folder
    // edit nuxt oneclick template
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
