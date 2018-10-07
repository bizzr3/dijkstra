'use strict';
const PropertiesReader = require('properties-reader');
const replies = PropertiesReader(process.env.PWD + '/src/utils/commandParser/replies.properties')

class commandParser {
    constructor() {
        this.supportedCmds = [
            'route'
        ]

        this.errors = {
            WSH_CMD_NOT_FOUND: 404
        }
    }

    parseCmd(cmd) {
        cmd = cmd.split(' ');

        if (!this.isCmdExists(cmd[0])) {
            return this.generateReply(this.errors.WSH_CMD_NOT_FOUND, cmd[0])
        }
    }

    generateReply(type, data) {
        switch (type) {
            case this.errors.WSH_CMD_NOT_FOUND:
                return `<span class='text-danger'>wsh: ${replies.get('not-found')}: ${data}</span>`;
                break;
        }
    }

    isCmdExists(cmd) {
        return this.supportedCmds[cmd] ? true : false
    }
}

module.exports = commandParser;
