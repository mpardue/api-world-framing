'use strict';

const httpProxy = require('http-proxy');
const request = require('request');
const fs = require('fs');

function createViewingSession(config) {
  return new Promise((resolve, reject) => {
    request.post({
      url: 'https://api.accusoft.com/PCCIS/V1/ViewingSession',
      headers: {
        'acs-api-key': config.key
      },
      json: {
        'render': {
          'html5': {
            'alwaysUseRaster': 'false'
          }
        }
      }
    }, (error, response) => {
      if (error) {
        return reject(error);
      }

      resolve(response.body.viewingSessionId);
    });
  });
}

function putFile(config, viewingSessionId, filePath) {
  fs.createReadStream(filePath)
    .pipe(request.put({
      url: 'https://api.accusoft.com/PCCIS/V1/ViewingSession/u' + viewingSessionId + '/SourceFile',
      headers: {
        'acs-api-key': config.key
      }
    }));

  return Promise.resolve();
}

function createViewingSessionForFile(config, filePath) {
  return createViewingSession(config)
    .then(viewingSessionId => {
      return putFile(config, viewingSessionId, filePath)
        .then(() => viewingSessionId);
    });
}

function createPccProxy(key) {
  const proxy = new httpProxy.createProxyServer({
    target: 'https://api.accusoft.com',
    headers: {
      'acs-api-key': key,
      host: 'api.accusoft.com'
    }
  });

  return proxy;
}

function setupPccProxyRoute(key, app) {
  const proxy = createPccProxy(key);

  app.get('/pcc*', (request, response) => {
    request.url = request.url.replace('pcc', 'PCCIS/V1');
    proxy.web(request, response);
  });
}

module.exports.initialize = (imports) => {
  setupPccProxyRoute(imports.config.key, imports.server.app);

  return Promise.resolve({
    key: imports.config.key,
    createViewingSession: createViewingSessionForFile.bind(this, imports.config)
  });
};