import { AutocompleteBase } from '../../base';
export default class Create extends AutocompleteBase {
    static hidden: boolean;
    static description: string;
    private _commands?;
    run(): Promise<void>;
    private ensureDirs;
    private createFiles;
    private readonly bashSetupScriptPath;
    private readonly bashCommandsListPath;
    private readonly zshSetupScriptPath;
    private readonly zshCompletionSettersPath;
    private readonly skipEllipsis;
    private readonly commands;
    private readonly bashCommandsList;
    private readonly zshCompletionSetters;
    private readonly zshCommandsSetter;
    private readonly zshCommandsFlagsSetters;
    private genCmdPublicFlags;
    private genCmdWithDescription;
    private genZshCmdFlagsSetter;
    private genZshAllCmdsListSetter;
    private readonly envAnalyticsDir;
    private readonly envCommandsPath;
    private readonly bashSetupScript;
    private readonly zshSetupScript;
    private readonly completionDotsFunc;
    private wantsLocalFiles;
}
