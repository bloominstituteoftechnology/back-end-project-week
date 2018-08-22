"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var union_1 = __importDefault(require("lodash/union"));
var without_1 = __importDefault(require("lodash/without"));
var EnterLeaveCounter = /** @class */ (function () {
    function EnterLeaveCounter() {
        this.entered = [];
    }
    EnterLeaveCounter.prototype.enter = function (enteringNode) {
        var previousLength = this.entered.length;
        var isNodeEntered = function (node) {
            return document.documentElement.contains(node) &&
                (!node.contains || node.contains(enteringNode));
        };
        this.entered = union_1.default(this.entered.filter(isNodeEntered), [enteringNode]);
        return previousLength === 0 && this.entered.length > 0;
    };
    EnterLeaveCounter.prototype.leave = function (leavingNode) {
        var previousLength = this.entered.length;
        this.entered = without_1.default(this.entered.filter(function (node) { return document.documentElement.contains(node); }), leavingNode);
        return previousLength > 0 && this.entered.length === 0;
    };
    EnterLeaveCounter.prototype.reset = function () {
        this.entered = [];
    };
    return EnterLeaveCounter;
}());
exports.default = EnterLeaveCounter;
//# sourceMappingURL=EnterLeaveCounter.js.map