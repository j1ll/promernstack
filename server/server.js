// const express = require('express');
import express from 'express';
import renderedPageRouter from './renderedPageRouter.jsx'
require('isomorphic-fetch');
const bodyParser = require('body-parser');
const path = require('path');
const {validateIssue,convertIssue} = require('./issue');

const {MongoClient, ObjectID} = require('mongodb');
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
}
app.use(express.static(path.join(__dirname, '../static')));
app.use(bodyParser.json());


app.get('/api/issues', (req, res) => {
  const filter={};
  // console.dir(req.query);
  if(req.query.status) filter.status=req.query.status;
  if (req.query.effort_lte || req.query.effort_gte) filter.effort = {};
  if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
  if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);
  // console.dir(filter);
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
app.get('/api/issues/:id', (req, res) => {
  let issueId;
  try {
    issueId = new ObjectID(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
    return;
  }
  
  db.collection('issues').find({ _id: issueId }).limit(1)
  .next()
  .then(issue => {
    if (!issue) res.status(404).json({ message: `No such issue: ${issueId}` });
    else res.json(issue);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});
app.put('/api/issues/:id', (req, res) =>{
  let issueId;
  try {
    issueId = new ObjectID(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
    return;
  }
  
  const issue = req.body;
  delete issue._id;
  
  const err = validateIssue(issue);
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }
  
  db.collection('issues').updateOne({ _id: issueId }, {$set: convertIssue(issue)}).then(() =>
    db.collection('issues').find({ _id: issueId }).limit(1)
    .next()
  )
  .then(savedIssue => {
    res.json(savedIssue);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send( `Internal Server Error: ${error}` );
    // res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});
app.delete('/api/issues/:id', (req, res) =>{
  let issueId;
  try {
    issueId = new ObjectID(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
    return;
  }
  /*
  const issue = req.body;
  delete issue._id;
  
  const err = validateIssue(issue);
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }*/
  
  db.collection('issues').deleteOne({ _id: issueId }).then((deleteResult) =>{
    if(deleteResult.result.n===1) res.json({status:'OK'});
    else res.json({status:'Warning: object not found'});
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});
/*app.get('*', (req, res) => {
  res.sendFile(path.resolve('static/index.html'));
});*/
app.use('/',renderedPageRouter);
MongoClient.connect('mongodb://127.0.0.1:27017').then(client => {
  db = client.db('issuetracker');
  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(error => {
  console.log('ERROR:', error);
});