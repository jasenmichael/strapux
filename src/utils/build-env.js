#!/usr/bin/env node

const child_process = require('child_process')
require('dotenv').config()
// console.log(process.argv)
// console.log(process.cwd())
const fs = require("fs")

// get Nuxt and Strapi paths
const frontendDir = require(`${process.cwd()}/strapux.config.json`).frontend.path
const backendDir = require(`${process.cwd()}/strapux.config.json`).backend.path

// check NODE_ENV, create Nuxt and Strapi .env files
let {
    NODE_ENV
} = process.env
if (NODE_ENV === undefined) NODE_ENV = 'development'

let prefix = 'DEVELOPMENT_'
console.log(`setup ${NODE_ENV} .env`)
switch (NODE_ENV) {
    case 'development':
        buildEnv(prefix, 'nuxt').then(() => {
            buildEnv(prefix, 'strapi')
        })
        break;

    case 'staging':
        prefix = 'STAGING_'
        buildEnv(prefix, 'nuxt').then(() => {
            buildEnv(prefix, 'strapi')
        })
        break

    case 'production':
        prefix = 'PRODUCTION_'
        buildEnv(prefix, 'nuxt').then(() => {
            buildEnv(prefix, 'strapi')
        })
        break

    default:
        console.log('NODE_ENV not set')
        break
}

async function buildEnv(prefix, nuxtOrStrapi) {
    // read .env line by line into array of strings
    let path = nuxtOrStrapi === 'nuxt' ? frontendDir : backendDir
    // create .env files if not exist
    prefix = nuxtOrStrapi === 'nuxt' ? `NUXT_${prefix}` : `STRAPI_${prefix}`
    let framworkPrefix = nuxtOrStrapi === 'nuxt' ? `NUXT_` : `STRAPI_`
    await bash(`touch ${nuxtOrStrapi}/.env`)
    await bash(`echo "# DO NOT EDIT - auto generated by Strapux" > ${path}/.env`)
    await bash(`echo "# edit main .env file in your Strapux project root folder" >> ${path}/.env`)
    await bash(`echo "# prefix each with ${framworkPrefix}DEVELOPMENT_, ${framworkPrefix}STAGING_, and ${framworkPrefix}PRODUCTION_" >> ${path}/.env`)
    await bash(`echo "# the appropriate enviroments will be stripped of prefix, and added to this file" >> ${path}/.env`)
    await bash(`echo "" >> ${path}/.env`)
    var envs = fs.readFileSync('.env').toString().split("\n");
    for (i in envs) {
        let line = envs[i]
        if (line.includes(prefix)) {
            if (!line.includes('#')) {
                let env = line.replace(prefix, '')
                bash(`echo "${env}" >> ${nuxtOrStrapi}/.env`)
            }
        }
    }
}


async function bash(cmd) {
    // console.log('running bash command -', cmd)
    try {
        child_process.execSync(cmd)
        return
    } catch (error) {
        // console.log(error)
        return {
            error
        }
    }
}
