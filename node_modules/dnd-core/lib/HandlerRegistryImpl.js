"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var invariant_1 = __importDefault(require("invariant"));
var asap = require('asap');
var registry_1 = require("./actions/registry");
var getNextUniqueId_1 = __importDefault(require("./utils/getNextUniqueId"));
var interfaces_1 = require("./interfaces");
var contracts_1 = require("./contracts");
function getNextHandlerId(role) {
    var id = getNextUniqueId_1.default().toString();
    switch (role) {
        case interfaces_1.HandlerRole.SOURCE:
            return "S" + id;
        case interfaces_1.HandlerRole.TARGET:
            return "T" + id;
        default:
            throw new Error("Unknown Handler Role: " + role);
    }
}
function parseRoleFromHandlerId(handlerId) {
    switch (handlerId[0]) {
        case 'S':
            return interfaces_1.HandlerRole.SOURCE;
        case 'T':
            return interfaces_1.HandlerRole.TARGET;
        default:
            invariant_1.default(false, "Cannot parse handler ID: " + handlerId);
    }
}
var HandlerRegistryImpl = /** @class */ (function () {
    function HandlerRegistryImpl(store) {
        this.store = store;
        this.types = {};
        this.dragSources = {};
        this.dropTargets = {};
        this.pinnedSourceId = null;
        this.pinnedSource = null;
    }
    HandlerRegistryImpl.prototype.addSource = function (type, source) {
        contracts_1.validateType(type);
        contracts_1.validateSourceContract(source);
        var sourceId = this.addHandler(interfaces_1.HandlerRole.SOURCE, type, source);
        this.store.dispatch(registry_1.addSource(sourceId));
        return sourceId;
    };
    HandlerRegistryImpl.prototype.addTarget = function (type, target) {
        contracts_1.validateType(type, true);
        contracts_1.validateTargetContract(target);
        var targetId = this.addHandler(interfaces_1.HandlerRole.TARGET, type, target);
        this.store.dispatch(registry_1.addTarget(targetId));
        return targetId;
    };
    HandlerRegistryImpl.prototype.containsHandler = function (handler) {
        var _this = this;
        return (Object.keys(this.dragSources).some(function (key) { return _this.dragSources[key] === handler; }) ||
            Object.keys(this.dropTargets).some(function (key) { return _this.dropTargets[key] === handler; }));
    };
    HandlerRegistryImpl.prototype.getSource = function (sourceId, includePinned) {
        if (includePinned === void 0) { includePinned = false; }
        invariant_1.default(this.isSourceId(sourceId), 'Expected a valid source ID.');
        var isPinned = includePinned && sourceId === this.pinnedSourceId;
        var source = isPinned ? this.pinnedSource : this.dragSources[sourceId];
        return source;
    };
    HandlerRegistryImpl.prototype.getTarget = function (targetId) {
        invariant_1.default(this.isTargetId(targetId), 'Expected a valid target ID.');
        return this.dropTargets[targetId];
    };
    HandlerRegistryImpl.prototype.getSourceType = function (sourceId) {
        invariant_1.default(this.isSourceId(sourceId), 'Expected a valid source ID.');
        return this.types[sourceId];
    };
    HandlerRegistryImpl.prototype.getTargetType = function (targetId) {
        invariant_1.default(this.isTargetId(targetId), 'Expected a valid target ID.');
        return this.types[targetId];
    };
    HandlerRegistryImpl.prototype.isSourceId = function (handlerId) {
        var role = parseRoleFromHandlerId(handlerId);
        return role === interfaces_1.HandlerRole.SOURCE;
    };
    HandlerRegistryImpl.prototype.isTargetId = function (handlerId) {
        var role = parseRoleFromHandlerId(handlerId);
        return role === interfaces_1.HandlerRole.TARGET;
    };
    HandlerRegistryImpl.prototype.removeSource = function (sourceId) {
        var _this = this;
        invariant_1.default(this.getSource(sourceId), 'Expected an existing source.');
        this.store.dispatch(registry_1.removeSource(sourceId));
        asap(function () {
            delete _this.dragSources[sourceId];
            delete _this.types[sourceId];
        });
    };
    HandlerRegistryImpl.prototype.removeTarget = function (targetId) {
        var _this = this;
        invariant_1.default(this.getTarget(targetId), 'Expected an existing target.');
        this.store.dispatch(registry_1.removeTarget(targetId));
        asap(function () {
            delete _this.dropTargets[targetId];
            delete _this.types[targetId];
        });
    };
    HandlerRegistryImpl.prototype.pinSource = function (sourceId) {
        var source = this.getSource(sourceId);
        invariant_1.default(source, 'Expected an existing source.');
        this.pinnedSourceId = sourceId;
        this.pinnedSource = source;
    };
    HandlerRegistryImpl.prototype.unpinSource = function () {
        invariant_1.default(this.pinnedSource, 'No source is pinned at the time.');
        this.pinnedSourceId = null;
        this.pinnedSource = null;
    };
    HandlerRegistryImpl.prototype.addHandler = function (role, type, handler) {
        var id = getNextHandlerId(role);
        this.types[id] = type;
        if (role === interfaces_1.HandlerRole.SOURCE) {
            this.dragSources[id] = handler;
        }
        else if (role === interfaces_1.HandlerRole.TARGET) {
            this.dropTargets[id] = handler;
        }
        return id;
    };
    return HandlerRegistryImpl;
}());
exports.default = HandlerRegistryImpl;
//# sourceMappingURL=HandlerRegistryImpl.js.map