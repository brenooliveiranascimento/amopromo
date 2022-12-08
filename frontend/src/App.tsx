import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/home'} component={Home}/>
        <Route path={'/'} component={LoginPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
