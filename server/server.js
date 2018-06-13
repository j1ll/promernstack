const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const validateIssue = require('./issue');
const {MongoClient} = require('mongodb');
const app = express();
let db;

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  
  const config = require('../webpack.config');
  config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  
  const bundler = webpack(config);
  app.use(webpackDevMiddleware(bundler, { noInfo: true }));
  app.use(webpackHotMiddleware(bundler, { log: console.log }));
};
app.use(express.static(path.join(__dirname, '../static')));
app.use(bodyParser.json());

app.get('/api/issues', (req, res) => {
  const filter={};
  if(req.query.status) filter.status=req.query.status;
  db.collection('issues').find(filter).toArray().then(issues=>{
  const metadata = { total_count: issues.length };
  res.json({ _metadata: metadata, records: issues });
    
  }).catch(error=>{
    console.error(error);
    res.status(500).json({message:'internal server error'})
  });
});
app.post('/api/issues', (req, res) => {

  const newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status)
    newIssue.status = 'New';
  
  const err = validateIssue(newIssue);
  if (err) {
    res.status(422).json({ message: `Invalid requrest: ${err}` });
    return;
  }
  db.collection('issues').insertOne(newIssue).then(result =>
    db.collection('issues').find({ _id: result.insertedId }).limit(1).next()
  ).then(newIssue => {
    res.json(newIssue);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});
app.get('*', (req, res) => {
  res.sendFile(path.resolve('static/index.html'));
});
MongoClient.connect('mongodb://127.0.0.1:27017').then(client => {
  db = client.db('issuetracker');
  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(error => {
  console.log('ERROR:', error);
});