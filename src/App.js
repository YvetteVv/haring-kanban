import logo from './logo.svg';
import './App.css';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Home} from "./home";
import React, {Component} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
function App() {
  return (
    <div className="App">
      <Route>
        <Switch>
          <Route
              path="/home"
              component={routeProps => <Home {...routeProps} />}
          />
          <Redirect to="/home"/>
        </Switch>
      </Route>
    </div>
  );
}

export default App;
