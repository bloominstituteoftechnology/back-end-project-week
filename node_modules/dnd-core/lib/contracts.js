"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var invariant_1 = __importDefault(require("invariant"));
var isArray_1 = __importDefault(require("lodash/isArray"));
function validateSourceContract(source) {
    invariant_1.default(typeof source.canDrag === 'function', 'Expected canDrag to be a function.');
    invariant_1.default(typeof source.beginDrag === 'function', 'Expected beginDrag to be a function.');
    invariant_1.default(typeof source.endDrag === 'function', 'Expected endDrag to be a function.');
}
exports.validateSourceContract = validateSourceContract;
function validateTargetContract(target) {
    invariant_1.default(typeof target.canDrop === 'function', 'Expected canDrop to be a function.');
    invariant_1.default(typeof target.hover === 'function', 'Expected hover to be a function.');
    invariant_1.default(typeof target.drop === 'function', 'Expected beginDrag to be a function.');
}
exports.validateTargetContract = validateTargetContract;
function validateType(type, allowArray) {
    if (allowArray && isArray_1.default(type)) {
        type.forEach(function (t) { return validateType(t, false); });
        return;
    }
    invariant_1.default(typeof type === 'string' || typeof type === 'symbol', allowArray
        ? 'Type can only be a string, a symbol, or an array of either.'
        : 'Type can only be a string or a symbol.');
}
exports.validateType = validateType;
//# sourceMappingURL=contracts.js.map