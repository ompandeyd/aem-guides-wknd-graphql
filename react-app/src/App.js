/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import logo from './images/wknd-logo-dk.svg';
import Adventures from './components/Adventures';
import AdventureDetail from './components/AdventureDetail';
import './App.scss';

function App() {

  return (
    <Router>
      <div className="App">
        <header>
          <img src="http://localhost:3000/static/media/wknd-logo-dk.36593320.svg" className="logo" alt="Audi Logo"/>
          <hr />
        </header>
      <Switch>
        <Route path='/adventure:path'>
          <AdventureDetail />
        </Route>  
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      </div>
    </Router>   
  );
}

/***
 * Displays a grid of current adventures
 */
function Home() {
  return (
    <div className="Home">
      <h2>Current Models</h2>
      <Adventures />
  </div>
  );
}


export default App;
