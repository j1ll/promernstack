import {renderToString} from 'react-dom/server';
import { StaticRouter } from "react-router-dom";
import React from 'react';
import Router from 'express';
import App from '../src/App.jsx'
import template from './template.js';
const renderedPageRouter = new Router();
renderedPageRouter.use(function (req,res,next) {
  req.initialState = {};
  next()
});
renderedPageRouter.use("/issues", function (req,res,next) {
  console.dir(req.originalUrl);
  fetch(`http://localhost:3000/api${req.originalUrl}`).then(response=>{response.json()
  .then(data=>{
    
    req.initialState.records = data.records||[data];
    next();
  })
  }).catch(err=>console.log(`Error rendering to string: ${err}`))
});

renderedPageRouter.get("*", (req,res)=>{
  const context = { };
  let reactDom = renderToString(
    <StaticRouter context={ context } location={ req.url }>
      <App {...req.initialState} />
    </StaticRouter>
  );
  
  if (context.url) res.redirect(context.url);
  else res.send(template(reactDom, req.initialState))
  
});
export default renderedPageRouter;