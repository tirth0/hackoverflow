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
import Roads from './components/Roads/RoadPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/connect/:providerName/redirect" component={LoginRedirect}/>
        <Route exact path="/" component={Login}/>
        <Route exact path="/Home" component={Application}/>
        <Route exact path="/Roads" component={Roads}/>
      </Switch>
    </Router>
  );
}

export default App;
