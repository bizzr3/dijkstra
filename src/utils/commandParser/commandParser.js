'use strict';
const PropertiesReader = require('properties-reader');
const replies = PropertiesReader(process.env.PWD + '/src/utils/commandParser/replies.properties')
const Router = require('../Router');

class commandParser {
    constructor() {
        this.router = new Router();

        this.supportedCmds = {
            route: {
                max_segments: 3,
                max_args: 1,
                options: ['-all', '-c', '-s'],
            }
        }

        this.errors = {
            WSH_CMD_NOT_FOUND: 404,
            WSH_CMD_BAD_REQUEST: 400,
            WSH_CMD_NOT_ENOUGH_ARGS: 309,
            WSH_ROUTE_NOT_FOUND: 405,
            WSH_ROUTE_ARGS_NOT_MATCH: 406
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

        return this.getCmdResult(cmd);
    }

    getCmdResult(cmd) {
        let input = cmd[2].split('-');

        switch (cmd[0]) {
            case 'route':
                if (cmd[1] === '-all') {
                    return this.fortmatResponse(this.router.getAllPossibleRoutes(input[0], input[1]))
                } else if (cmd[1] === '-c') {
                    return this.fortmatResponse(this.router.getCheapestRoute(input[0], input[1]), 'Cheapest')
                } else if (cmd[1] === '-s') {
                    return this.fortmatResponse(this.router.getRouteCostByInput(cmd[2]), 'Cost Of')
                }

                break;
        }
    }

    fortmatResponse(data, title = 'All') {
        if (typeof (data) === 'object' && !Object.keys(data).length) {
            return this.generateErrorReply(this.errors.WSH_ROUTE_NOT_FOUND)
        }

        let result = `<p>${title} Possible Route(s): ${Object.keys(data).length}</p>`;

        for (let index in data) {
            //TODO: add route number
            result += `<p>Route: <span class="text-success">${data[index].route}</span> , Cost: <span class="text-success">${data[index].cost}</span></p>`;
        }

        return result;
    }

    generateErrorReply(type, data = '') {
        switch (type) {
            case this.errors.WSH_CMD_NOT_FOUND:
                return `<span class='text-danger'>wsh: ${replies.get('not-found')}: ${data}</span>`;
                break;
            case this.errors.WSH_CMD_BAD_REQUEST:
                return `${replies.get('invalid-cmd')}`;
                break;
            case this.errors.WSH_ROUTE_NOT_FOUND:
                return `<span class='text-danger'>Route: ${replies.get('route-not-found')}</span>`;
                break;
            case this.errors.WSH_ROUTE_ARGS_NOT_MATCH:
                return `<span class='text-danger'>Route: ${replies.get('args-not-match')}</span>`;
                break;

        }
    }

    validateCmd(cmd) {
        if (!this.isCmdExists(cmd[0])) {
            return this.generateErrorReply(this.errors.WSH_CMD_NOT_FOUND, cmd[0])
        }

        if (!this.hasValidSegments(cmd[0], cmd.length)) {
            return this.generateErrorReply(this.errors.WSH_CMD_BAD_REQUEST, cmd[0])
        }

        if (!this.hasValidOption(cmd[0], cmd[1])) {
            return this.generateErrorReply(this.errors.WSH_CMD_BAD_REQUEST, cmd[0])
        }

        if (!this.hasValidArgs(cmd)) {
            return this.generateErrorReply(this.errors.WSH_ROUTE_ARGS_NOT_MATCH)
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

    hasValidArgs(cmd) {
        if (cmd[1] !== '-s' && cmd[2].length > 3) {
            return false;
        }

        return true;
    }
}

module.exports = commandParser;
