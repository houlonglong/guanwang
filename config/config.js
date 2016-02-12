var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'guanwang'
    },
    port: 3000,
    db: 'mongodb://localhost/guanwang-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'guanwang'
    },
    port: 3000,
    db: 'mongodb://localhost/guanwang-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'guanwang'
    },
    port: 3000,
    db: 'mongodb://localhost/guanwang-production'
  }
};

module.exports = config[env];
