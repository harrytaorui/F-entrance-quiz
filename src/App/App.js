import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import MemberPage from './Component/MemberPage';
import '@babel/polyfill';

class App extends Component {
  render() {
    return (
      <div data-testid="app" className="App">
        {/* TODO GTB-工程实践： * 这里没有必要使用路由 */}
        <BrowserRouter>
          <Switch>
            <Route component={MemberPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
