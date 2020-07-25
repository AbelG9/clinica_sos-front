import React, {useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faThermometerFull,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import SubMenu from "./SubMenu";
import Logo from '../../assets/img/logo.svg';
import {AuthContext} from '../../contexts/AuthContext';

const SideBar = ({ isOpen, toggle }) => {
  const { state } = useContext(AuthContext);
  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <Link to='/paciente/obtenercita'>
          <img src={Logo} alt="Fairdent" className="logo-pos"/>
        </Link>
        <span color="info" onClick={toggle} style={{ color: "#fff" }}>
          &times;
        </span>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <p>{state.email}</p>
          <NavItem>
            <NavLink tag={Link} to={"/paciente/perfil"}>
              <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
              Perfil
            </NavLink>
          </NavItem>
          <SubMenu title="Citas" icon={faCalendar} items={submenus[0]} />
          <NavItem>
            <NavLink tag={Link} to={"/paciente/triaje"}>
              <FontAwesomeIcon icon={faThermometerFull} className="mr-2" />
              Triaje
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  )
};

const submenus = [
  [
    {
      title: "Mis Citas",
      target: "/paciente/listacitas",
    },
    {
      title: "Obtener Cita",
      target: "/paciente/obtenercita",
    },
  ],
];

export default SideBar;