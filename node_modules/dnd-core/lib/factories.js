"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DragDropManagerImpl_1 = __importDefault(require("./DragDropManagerImpl"));
function createDragDropManager(backend, context) {
    return new DragDropManagerImpl_1.default(backend, context);
}
exports.createDragDropManager = createDragDropManager;
//# sourceMappingURL=factories.js.map