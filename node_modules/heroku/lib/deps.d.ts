import FS = require('fs-extra');
import { HTTP } from 'http-call';
import file = require('./file');
import UserConfig from './user-config';
declare const _default: {
    readonly fs: typeof FS;
    readonly HTTP: typeof HTTP;
    readonly file: typeof file;
    readonly UserConfig: typeof UserConfig;
};
export default _default;
