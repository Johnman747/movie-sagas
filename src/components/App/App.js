import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Home from '../Home/Home'
import Details from '../Details/Details'
import Edit from '../Edit/Edit'
import Admin from '../Admin/Admin'

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
      <div className="App">
        <Route path='/' exact component={Home}/>
        <Route path='/details/:id' render={({match})=><Details match={match}/>}/>
        <Route path='/edit/:id' render={({match})=><Edit match={match}/>}/>
        <Route path='/admin' render={()=><Admin/>}/>
      </div>
      </Router>
    );
  }
}

export default App;
