import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home'
import NoFound from "./pages/404";
import RegisterData from "./pages/Register";
import Dashb from "./pages/Dashb";

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashb} />
          <Route exact path="/registro" component={RegisterData} />
          <Route exact component={NoFound} />
        </Switch>
      </Router>
  );
}

export default App;
