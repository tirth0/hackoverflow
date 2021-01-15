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
import Application from './components/Application/App';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/connect/:providerName" component={LoginRedirect}/>
        <Route exact path="/" component={Login}/>
        <Route exact path="/Home" component={Application}/>
      </Switch>
    </Router>
  );
}

export default App;
