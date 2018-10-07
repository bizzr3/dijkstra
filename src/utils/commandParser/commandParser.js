'use strict';
const PropertiesReader = require('properties-reader');
const replies = PropertiesReader(process.env.PWD + '/src/utils/commandParser/replies.properties')
const Router = require

class commandParser {
    constructor() {
        this.supportedCmds = {
            route: {
                max_segments: 4,
                max_args: 2,
                options: ['-all', '-c'],
            }
        }

        this.errors = {
            WSH_CMD_NOT_FOUND: 404,
            WSH_CMD_BAD_REQUEST: 400,
            WSH_CMD_NOT_ENOUGH_ARGS: 309
        }
    }

    parseCmd(cmd) {

        cmd = cmd.replace(/(\r\n|\n|\r)/gm, "")
            .trim()
            .split(' ');

        //TODO: add CMD name to the class properties.

        let isInvalidCmd = this.validateCmd(cmd);

        if (isInvalidCmd) {
            return isInvalidCmd;
        }

        return 'CMD ok.'
    }

    generateReply(type, data) {
        switch (type) {
            case this.errors.WSH_CMD_NOT_FOUND:
                return `<span class='text-danger'>wsh: ${replies.get('not-found')}: ${data}</span>`;
                break;
            case this.errors.WSH_CMD_BAD_REQUEST:
                return `${replies.get('invalid-cmd')}`;
                break;
        }
    }

    validateCmd(cmd) {
        if (!this.isCmdExists(cmd[0])) {
            return this.generateReply(this.errors.WSH_CMD_NOT_FOUND, cmd[0])
        }

        if (!this.hasValidSegments(cmd[0], cmd.length)) {
            return this.generateReply(this.errors.WSH_CMD_BAD_REQUEST, cmd[0])
        }

        if (!this.hasValidOption(cmd[0], cmd[1])) {
            return this.generateReply(this.errors.WSH_CMD_BAD_REQUEST, cmd[0])
        }

        return false;
    }

    isCmdExists(cmd) {
        return this.supportedCmds[cmd] ? true : false;
    }

    hasValidOption(cmd, option) {
        for (let index in this.supportedCmds[cmd].options) {
            if (this.supportedCmds[cmd].options[index] === option) {
                return true;
            }
        }

        return false;
    }

    hasValidSegments(cmd, segments) {
        return this.supportedCmds[cmd].max_segments == segments ? true : false;
    }
}

module.exports = commandParser;
