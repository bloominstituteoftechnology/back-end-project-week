"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isArray_1 = __importDefault(require("lodash/isArray"));
function matchesType(targetType, draggedItemType) {
    if (draggedItemType === null) {
        return targetType === null;
    }
    return isArray_1.default(targetType)
        ? targetType.some(function (t) { return t === draggedItemType; })
        : targetType === draggedItemType;
}
exports.default = matchesType;
//# sourceMappingURL=matchesType.js.map