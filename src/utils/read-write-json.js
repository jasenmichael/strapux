const loadJsonFile = require('load-json-file')
const writeJsonFile = require('write-json-file')

async function read(jsonFile) {
    return await loadJsonFile(jsonFile).catch(err => {
        console.log(err)
        process.exit(1)
    })
}
async function write(jsonFile, data) {
    await writeJsonFile(jsonFile, data).catch(err => {
        console.log(err)
        process.exit(1)
    })
}

module.exports = {
    read,
    write
}
