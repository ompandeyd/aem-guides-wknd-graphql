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
import AudiModels from './components/AudiModel.js';
import VwModels from './components/VwModel.js';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <img src="" className="logo" alt="Audi Logo"/>
          <hr />
        </header>
      <Switch> 
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      </div>
    </Router>   
  );
}

/***
 * Displays a grid of current audiModels
 */
function Home() {
  var brandName = window.brandName;
  console.log("Brand Name is :" +brandName);
  if(brandName === 'Audi') {
    return (
      <div className="Home">
        <h2>Current Audi Models</h2>
    <AudiModels />
    </div>
    );
  }
  if(brandName === 'Vw') {
    return (
      <div className="Home">
        <h2>Current VW Models</h2>
    <VwModels />
    </div>
    );
  }
}
export default App;
