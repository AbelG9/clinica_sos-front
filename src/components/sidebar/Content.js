import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import Topbar from "./Topbar";
import PrivateRoute from "../../PrivateRoute";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
      <PrivateRoute exact path="/paciente/perfil" component={() => "Perfil"} />
      <PrivateRoute exact path="/paciente/listacitas" component={() => "Lista de Citas"} />
      <PrivateRoute exact path="/paciente/obtenercita" component={() => "Sacar una cita"} />
      <PrivateRoute exact path="/paciente/triaje" component={() => "Triaje"} />
  </Container>
);

export default Content;