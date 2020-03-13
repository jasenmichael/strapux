const {
    install
} = require('./main.js')

const version = require('../package.json').version
import program from 'commander'

export function cli() {
    console.log(process.argv)
    program
        .option('--oneclick', 'one click install')
        .option('--freshy-install', 'WARNING deletes path directory before installing')
        .version(version)
        .usage('install <path>')
        .command('install <path>')
        .description('if no path provided use current directory.')
        .action((path) => {
            install(path, process.argv[4]).catch(err => {
                console.log(err)
                process.exit(1)
            })
        })
    program.parse(process.argv)

    if (program.commands[0]._name !== process.argv[2]) {
        console.log(`invalid parameter ${process.argv[2]}\n`)
        program.outputHelp()
        process.exit(1)
    }
    if (process.argv[2] === undefined) {
        console.log('missing parameter\n', )
        program.outputHelp()
        process.exit(1)
    }

}
