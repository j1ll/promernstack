import React from 'react';
import Context from '../Context.jsx';
import Toolbar from './Toolbar.jsx';
export default class Testik extends React.Component{
  render(){return(
    <Context.Provider value={this.props}>
      <Toolbar />
    </Context.Provider>
  )}
}