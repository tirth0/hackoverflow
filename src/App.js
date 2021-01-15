import logo from './logo.svg';
import AuthBtns from './components/login/Login';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/login/Login'
import Home from './components/homePage/Home';
import LoginRedirect from './components/loginRedirect/LoginRedirect';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/connect/:providerName/redirect" component={LoginRedirect}/>
        <Route exact path="/" component={Login}/>
        <Route exact path="/Home" component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;
