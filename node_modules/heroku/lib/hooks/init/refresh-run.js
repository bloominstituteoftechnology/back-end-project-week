"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Config = tslib_1.__importStar(require("@oclif/config"));
const analytics_1 = tslib_1.__importDefault(require("../../analytics"));
async function run() {
    const config = await Config.load({ root: __dirname });
    const analytics = new analytics_1.default(config);
    await analytics.submit();
}
run()
    .catch(require('@oclif/errors/handle'));
