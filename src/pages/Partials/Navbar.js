import React, { useState  } from 'react';
import '../../assets/styles/Navbar.css';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav
  } from 'reactstrap';
  import Logo from '../../assets/img/logo.svg'
  
const NavPac = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    
    return (
      <div>
        <Navbar color="light" light expand="md" className="shadow">
          <NavbarBrand href="/">
              <img src={Logo} alt="Fairdent" width="150"/>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
            </Nav>
            <a href="https://web.facebook.com/clinicafairdent" className="fbimage">      </a>
          </Collapse>
        </Navbar>
      </div>
    );
}

export default NavPac;