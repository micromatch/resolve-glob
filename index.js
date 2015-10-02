/*!
 * resolve-glob <https://github.com/jonschlinkert/resolve-glob>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');
var utils = require('./utils');

module.exports = function(patterns, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (typeof cb !== 'function') {
    throw new Error('expected a callback function.');
  }

  if (!utils.isValidGlob(patterns)) {
    return cb(new Error('expected a valid glob pattern.'));
  }

  var opts = options || {};
  opts.cwd = utils.resolve(opts.cwd || '');

  utils.glob(patterns, opts, function (err, files) {
    if (err) return cb(err);

    var len = files.length, i = -1;
    while (++i < len) {
      files[i] = path.resolve(opts.cwd, files[i]);
    }
    cb(null, files);
  });
};

module.exports.sync = function(patterns, options) {
  if (!utils.isValidGlob(patterns)) {
    throw new Error('expected a valid glob pattern.');
  }

  var opts = options || {};
  opts.cwd = utils.resolve(opts.cwd || '');
  var files = utils.glob.sync(patterns, opts);
  var len = files.length, i = -1;

  while (++i < len) {
    files[i] = path.resolve(opts.cwd, files[i]);
  }
  return files;
};
