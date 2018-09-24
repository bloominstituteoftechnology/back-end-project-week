import * as Config from '@oclif/config';
import deps from './deps';
export interface AnalyticsJSONCommand {
    command: string;
    completion: number;
    version: string;
    plugin: string;
    plugin_version: string;
    os: string;
    shell: string;
    language: string;
    valid: true;
}
export interface AnalyticsJSON {
    schema: 1;
    commands: AnalyticsJSONCommand[];
}
export interface AnalyticsJSONPost {
    schema: 1;
    commands: AnalyticsJSONCommand[];
    install: string;
    cli: string;
    user: string;
}
export interface RecordOpts {
    Command: Config.Command.Class;
    argv: string[];
}
export default class AnalyticsCommand {
    config: Config.IConfig;
    userConfig: typeof deps.UserConfig.prototype;
    http: typeof deps.HTTP;
    constructor(config: Config.IConfig);
    _initialAnalyticsJSON(): AnalyticsJSON;
    record(opts: RecordOpts): Promise<void>;
    submit(): Promise<void>;
    readonly url: string;
    readonly analyticsPath: string;
    readonly usingHerokuAPIKey: boolean;
    readonly netrcLogin: string | undefined;
    readonly user: string | undefined;
    _readJSON(): Promise<AnalyticsJSON>;
    _writeJSON(analyticsJSON: AnalyticsJSON): Promise<void>;
    _acAnalytics(id: string): Promise<number>;
    private init;
}
