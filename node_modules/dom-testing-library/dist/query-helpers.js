"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debugDOM = debugDOM;
exports.getElementError = getElementError;
exports.firstResultOrNull = firstResultOrNull;
exports.queryAllByAttribute = queryAllByAttribute;
exports.queryByAttribute = queryByAttribute;

var _prettyDom = require("./pretty-dom");

var _matches = require("./matches");

/* eslint-disable complexity */
function debugDOM(htmlElement) {
  const limit = process.env.DEBUG_PRINT_LIMIT || 7000;
  const inNode = typeof process !== 'undefined' && process.versions !== undefined && process.versions.node !== undefined;
  const window = htmlElement.ownerDocument && htmlElement.ownerDocument.defaultView || undefined;
  const inCypress = typeof global !== 'undefined' && global.Cypress || typeof window !== 'undefined' && window.Cypress;
  /* istanbul ignore else */

  if (inCypress) {
    return '';
  } else if (inNode) {
    return (0, _prettyDom.prettyDOM)(htmlElement, limit);
  } else {
    return (0, _prettyDom.prettyDOM)(htmlElement, limit, {
      highlight: false
    });
  }
}
/* eslint-enable complexity */


function getElementError(message, container) {
  return new Error([message, debugDOM(container)].filter(Boolean).join('\n\n'));
}

function firstResultOrNull(queryFunction, ...args) {
  const result = queryFunction(...args);
  if (result.length === 0) return null;
  return result[0];
}

function queryAllByAttribute(attribute, container, text, {
  exact = true,
  collapseWhitespace,
  trim,
  normalizer
} = {}) {
  const matcher = exact ? _matches.matches : _matches.fuzzyMatches;
  const matchNormalizer = (0, _matches.makeNormalizer)({
    collapseWhitespace,
    trim,
    normalizer
  });
  return Array.from(container.querySelectorAll(`[${attribute}]`)).filter(node => matcher(node.getAttribute(attribute), node, text, matchNormalizer));
}

function queryByAttribute(...args) {
  return firstResultOrNull(queryAllByAttribute, ...args);
}