import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Member from './Component/Member';
import '@babel/polyfill';

class App extends Component {
  render() {
    return (
      <div data-testid="app" className="App">
        <BrowserRouter>
          <Switch>
            <Route component={Member} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
