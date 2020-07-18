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
      <PrivateRoute exact path="/home" component={() => "Hello"} />
      <PrivateRoute exact path="/about" component={() => "About"} />
      <PrivateRoute exact path="/Pages" component={() => "Pages"} />
      <PrivateRoute exact path="/faq" component={() => "FAQ"} />
      <PrivateRoute exact path="/contact" component={() => "Contact"} />
      <PrivateRoute exact path="/Home-1" component={() => "Home-1"} />
      <PrivateRoute exact path="/Home-2" component={() => "Home-2"} />
      <PrivateRoute exact path="/Home-3" component={() => "Home-3"} />
      <PrivateRoute exact path="/Page-1" component={() => "Page-1"} />
      <PrivateRoute exact path="/Page-2" component={() => "Page-2"} />
      <PrivateRoute exact path="/page-1" component={() => "page-1"} />
      <PrivateRoute exact path="/page-2" component={() => "page-2"} />
      <PrivateRoute exact path="/page-3" component={() => "page-3"} />
      <PrivateRoute exact path="/page-4" component={() => "page-4"} />
  </Container>
);

export default Content;