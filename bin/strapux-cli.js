#!/usr/bin/env node
const Strapux = require('../src/main.js')
// console.log('strapux cli started..', process.cwd())

const version = require('../package.json').version
const program = require('commander')
// console.log('strapux-cli args passed:\n', process.argv)


; //init cli
(() => {
    program
        .requiredOption('-p, --path <path>', 'path to install REQUIRED')
        .option('-o, --oneclick', 'one click install')
        .option('-t, --template [template]', 'json file template')
        .version(version)
        .usage('[options]')
        .description('if no path provided use current directory.')
        .action(options => {
            const opts = {
                path: options.path,
                oneclick: options.oneclick !== undefined ? options.oneclick : false,
                template: options.template !== undefined ? options.template : false
            }
            Strapux.create(opts)

        })
    program.parse(process.argv)

    if (!process.argv[2] || !process.argv[1]) {
        console.log(`Missing command\n`)
        program.outputHelp()
        process.exit(1)
    }
})()
