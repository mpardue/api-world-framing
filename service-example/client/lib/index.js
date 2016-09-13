'use strict';

const fs = require('fs');
const path = require('path');

let prizmdoc = null

function getFilePaths() {
  return new Promise((resolve, reject) => {
    fs.readdir(path.join(__dirname, '../documents'), (error, directories) => {
      if (error) {
        return reject(error);
      }

      resolve(directories);
    });
  });
}

function handleHomeRequest(request, response, next) {
  return getFilePaths()
    .then(filepaths => {
      response.render('index.html', { filepaths: filepaths });
    }, next);
}

function handleViewRequest(request, response, next) {
  return prizmdoc.createViewingSession(path.join(__dirname, '../documents', request.params.fileName))
    .then(viewingSessionId => {
      response.render('view.html', { viewingSessionId: viewingSessionId });
    }, next);
}

module.exports.initialize = (imports) => {
  prizmdoc = imports.prizmdoc;
  const app = imports.server.app;
  const nunjucks = require('nunjucks');
  const path =  require('path');

  nunjucks.configure(path.join(__dirname, '/../views/'), {
    express: app,
    autoescape: true
  });

  app.set('view engine', 'html');

  app.use(imports.server.middleware.static(path.join(__dirname, '/../dist')));

  app.get('/', handleHomeRequest);
  app.get('/view/:fileName', handleViewRequest);

  return Promise.resolve();
};