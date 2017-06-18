'use strict';

const os = require('os');
const path = require('path');
const serve = require('koa-static');
const router = require('koa-router');

const pkg = require('../package');
const logger = require('./common/logger');

module.exports = app => {
  const string = `${pkg.name}/${pkg.version} node/${process.version}(${os.platform()})`;

  app.use(function *powerby(next) {
    yield next;
    this.set('X-Powered-By', string);
  });

  const p = path.join(__dirname, '..', 'assets');
  app.use(serve(p));
  app.use(serve(path.join(p, '3rdparty')));
  router(app);

  app.use(logger.middleware);
};