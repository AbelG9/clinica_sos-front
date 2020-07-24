import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import Topbar from "./Topbar";
import PrivateRoute from "../../PrivateRoute";
import Profile from "../contents/Profile";
import Createcita from "../contents/Createcita";
import Listacitas from "../contents/ListaCitas";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
      <PrivateRoute exact path="/paciente/perfil" component={Profile} />
      <PrivateRoute exact path="/paciente/listacitas" component={Listacitas} />
      <PrivateRoute exact path="/paciente/obtenercita" component={Createcita} />
      <PrivateRoute exact path="/paciente/triaje" component={() => "Triaje"} />
  </Container>
);

export default Content;