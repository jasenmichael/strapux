const execa = require('execa')

module.exports = async function(command, cwd, hide) {
    hide = hide === true ? 'ignore' : 'inherit'
    cmd = command.split(' ')[0]
    args = command.split(' ').splice(1)
    return await execa(cmd, args, {
        cwd,
        stdio: hide
    })
}
