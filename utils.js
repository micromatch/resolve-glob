'use strict';

/**
 * Lazily required module dependencies
 */

var lazy = require('lazy-cache')(require);
var fn = require;

require = lazy;
require('globby', 'glob');
require('is-valid-glob');
require('resolve-dir', 'resolve');
require = fn;

/**
 * Expose `lazy` modules
 */

module.exports = lazy;
