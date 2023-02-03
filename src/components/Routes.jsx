import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={ Login }
          />
          <Route
            exact
            path="/carteira"
            component={ Wallet }
          />
        </Switch>
      </div>
    );
  }
}

export default Routes;
