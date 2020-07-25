import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home'
import NoFound from "./pages/404";
import Mainpatient from "./pages/MainPaciente";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/paciente" component={Mainpatient} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={SignUp} />
          <Route exact component={NoFound} />
        </Switch>
      </Router>
  );
}

export default App;
