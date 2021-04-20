import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './component/Login';
import Header from './component/Header'
import { Container } from 'react-bootstrap';
import Register from './component/Register';
import { UserProfile } from './component/UserProfile';


// import Register from './component/Register'

function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Switch>
        <Route  exact path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/' component={UserProfile}/>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
