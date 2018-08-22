"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var HTML5Backend_1 = __importDefault(require("./HTML5Backend"));
var getEmptyImage_1 = __importDefault(require("./getEmptyImage"));
exports.getEmptyImage = getEmptyImage_1.default;
var NativeTypes = __importStar(require("./NativeTypes"));
exports.NativeTypes = NativeTypes;
function createHTML5Backend(manager) {
    return new HTML5Backend_1.default(manager);
}
exports.default = createHTML5Backend;
//# sourceMappingURL=index.js.map