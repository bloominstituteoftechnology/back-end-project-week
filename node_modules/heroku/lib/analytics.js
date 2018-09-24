"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = require("@heroku-cli/command");
const cli_ux_1 = tslib_1.__importDefault(require("cli-ux"));
const netrc_parser_1 = tslib_1.__importDefault(require("netrc-parser"));
const path = tslib_1.__importStar(require("path"));
const deps_1 = tslib_1.__importDefault(require("./deps"));
const debug = require('debug')('heroku:analytics');
class AnalyticsCommand {
    constructor(config) {
        this.config = config;
        this.http = deps_1.default.HTTP.create({
            headers: { 'user-agent': config.userAgent },
        });
    }
    _initialAnalyticsJSON() {
        return {
            schema: 1,
            commands: [],
        };
    }
    async record(opts) {
        await this.init();
        const plugin = opts.Command.plugin;
        if (!plugin) {
            debug('no plugin found for analytics');
            return;
        }
        if (!this.user)
            return;
        let analyticsJSON = await this._readJSON();
        analyticsJSON.commands.push({
            command: opts.Command.id,
            completion: await this._acAnalytics(opts.Command.id),
            version: this.config.version,
            plugin: plugin.name,
            plugin_version: plugin.version,
            os: this.config.platform,
            shell: this.config.shell,
            valid: true,
            language: 'node',
        });
        await this._writeJSON(analyticsJSON);
    }
    async submit() {
        try {
            await this.init();
            let user = this.user;
            if (!user)
                return;
            const local = await this._readJSON();
            if (local.commands.length === 0)
                return;
            await deps_1.default.file.remove(this.analyticsPath);
            const body = {
                schema: local.schema,
                commands: local.commands,
                user,
                install: this.userConfig.install,
                cli: this.config.name,
            };
            await this.http.post(this.url, { body });
        }
        catch (err) {
            debug(err);
            await deps_1.default.file.remove(this.analyticsPath).catch(err => cli_ux_1.default.warn(err));
        }
    }
    get url() {
        return process.env.HEROKU_ANALYTICS_URL || 'https://cli-analytics.heroku.com/record';
    }
    get analyticsPath() {
        return path.join(this.config.cacheDir, 'analytics.json');
    }
    get usingHerokuAPIKey() {
        const k = process.env.HEROKU_API_KEY;
        return !!(k && k.length > 0);
    }
    get netrcLogin() {
        return netrc_parser_1.default.machines[command_1.vars.apiHost] && netrc_parser_1.default.machines[command_1.vars.apiHost].login;
    }
    get user() {
        if (this.userConfig.skipAnalytics || this.usingHerokuAPIKey)
            return;
        return this.netrcLogin;
    }
    async _readJSON() {
        try {
            let analytics = await deps_1.default.file.readJSON(this.analyticsPath);
            analytics.commands = analytics.commands || [];
            return analytics;
        }
        catch (err) {
            if (err.code !== 'ENOENT')
                debug(err);
            return this._initialAnalyticsJSON();
        }
    }
    async _writeJSON(analyticsJSON) {
        return deps_1.default.file.outputJSON(this.analyticsPath, analyticsJSON);
    }
    async _acAnalytics(id) {
        if (id === 'autocomplete:options')
            return 0;
        let root = path.join(this.config.cacheDir, 'autocomplete', 'completion_analytics');
        let meta = {
            cmd: deps_1.default.file.exists(path.join(root, 'command')),
            flag: deps_1.default.file.exists(path.join(root, 'flag')),
            value: deps_1.default.file.exists(path.join(root, 'value')),
        };
        let score = 0;
        if (await meta.cmd)
            score += 1;
        if (await meta.flag)
            score += 2;
        if (await meta.value)
            score += 4;
        if (await deps_1.default.file.exists(root))
            await deps_1.default.file.remove(root);
        return score;
    }
    async init() {
        await netrc_parser_1.default.load();
        this.userConfig = new deps_1.default.UserConfig(this.config);
        await this.userConfig.init();
    }
}
exports.default = AnalyticsCommand;
