'use strict';

function Server(http, express, options) {
  this.app = express();
  this.server = http.Server(this.app);

  this.options = options;
}

Server.prototype.initialize = function (options = {}) {
  return new Promise((resolve, reject) => {
    this.server.listen(this.options.port || options.port, (error) => {
      if (error) {
        return reject(error);
      }

      resolve();
    });
  });
};

module.exports.initialize = () => {
  const express = require('express');

  const server = new Server(
    require('http'),
    express,
    {
      port: 8080
    }
  );

  return server.initialize()
    .then(() => {
      return {
        middleware: {
          static: express.static
        },
        httpServer: server.server,
        app: server.app
      };
    });
};