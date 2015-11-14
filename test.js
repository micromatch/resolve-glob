'use strict';

require('mocha');
var assert = require('assert');
var should = require('should');
var isAbsolute = require('is-absolute');
var glob = require('./');

describe('glob', function () {
  it('should resolve the absolute path for files returned by glob:', function (cb) {
    glob('*.js', function (err, files) {
      if (err) return cb(err);
      assert(files.length > 0);
      assert(isAbsolute(files[0]));
      cb();
    });
  });

  it('should support arrays:', function (cb) {
    glob(['*.js', '*.md', '!**/test.js'], function (err, files) {
      if (err) return cb(err);
      assert(files.length > 0);
      assert(isAbsolute(files[0]));
      cb();
    });
  });

  it('should resolve the absolute path with a cwd:', function (cb) {
    var opts = {cwd: 'node_modules/is-absolute'};
    glob('*.js', opts, function (err, files) {
      if (err) return cb(err);
      assert(files.length > 0);
      assert(isAbsolute(files[0]));
      cb();
    })
  });

  it('should resolve the absolute path to the user home directory:', function (cb) {
    glob('*.*', {cwd: '~'}, function (err, files) {
      if (err) return cb(err);
      assert(files.length > 0);
      assert(isAbsolute(files[0]));
      cb();
    })
  });

  it('should resolve the absolute path to global npm modules:', function (cb) {
    glob('*', {cwd: '@'}, function (err, files) {
      if (err) return cb(err);
      assert(files.length > 0);
      assert(isAbsolute(files[0]));
      cb();
    })
  });

  it('should throw an error when a callback is not passed:', function () {
    try {
      glob();
      throw new Error('expected an error to be thrown');
    } catch(err) {
      assert(err);
      assert(err.message === 'expected a callback function.');
    }
  });

  it('should throw an error when invalid args are passed:', function (cb) {
    glob(null, function (err, files) {
      assert(err);
      assert(err.message === 'expected a valid glob pattern.');
      cb();
    });
  });
});

describe('glob.sync', function () {
  it('should resolve the absolute path for files returned by glob:', function () {
    var files = glob.sync('*.js');
    assert(files.length > 0);
    assert(isAbsolute(files[0]));
  });

  it('should return the pattern when no matches and nonull is passed:', function () {
    var files = glob.sync('*.foo', {nonull: true});
    assert(files[0] === '*.foo');
  });

  it('should resolve the absolute path with a cwd:', function () {
    var files = glob.sync('*.js', {cwd: 'node_modules/is-absolute'});
    assert(files.length > 0);
    assert(isAbsolute(files[0]));
  });

  it('should throw an error when invalid args are passed:', function () {
    try {
      glob.sync();
      throw new Error('expected an error to be thrown');
    } catch(err) {
      assert(err);
      assert(err.message === 'expected a valid glob pattern.');
    }
  });
});
