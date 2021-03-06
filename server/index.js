import 'babel-polyfill';
import http from 'http';

import { MongoClient } from 'mongodb';

let appModule = require('./server.js');
let db;
let server;

MongoClient.connect('mongodb://127.0.0.1:27017').then(client => {
  db = client.db('issuetracker');
  server = http.createServer();
  appModule.setDb(db);
  server.on('request', appModule.app);
  server.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(error => {
  console.log('ERROR:', error);
});

if (module.hot) {
  module.hot.accept('./server.js', () => {
    server.removeListener('request', appModule.app);
    appModule = require('./server.js');     // eslint-disable-line
    appModule.setDb(db);
    server.on('request', appModule.app);
  });
}