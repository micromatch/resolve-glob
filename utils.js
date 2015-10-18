'use strict';

/**
 * Lazily required module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;

require = utils;
require('matched', 'glob');
require('is-valid-glob');
require('resolve-dir', 'resolve');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
