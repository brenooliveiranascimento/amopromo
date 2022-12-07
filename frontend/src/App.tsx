import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/'} component={LoginPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
