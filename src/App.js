import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home'
import NoFound from "./pages/404";
import Mainpatient from "./pages/MainPaciente";

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/paciente" component={Mainpatient} />
          <Route exact component={NoFound} />
        </Switch>
      </Router>
  );
}

export default App;
