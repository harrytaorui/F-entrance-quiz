import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Members from './Component/Members';
import '@babel/polyfill';

class App extends Component {
  render() {
    return (
      <div data-testid="app" className="App">
        <BrowserRouter>
          <Switch>
            <Route component={Members} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
