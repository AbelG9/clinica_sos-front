import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../../assets/styles/react-sidenav.css';
import LogoPerfil from '../../assets/img/logo-perfil.svg';
import LogoCitas from '../../assets/img/logo-citas.svg';
import LogoTriaje from '../../assets/img/logo-triaje.svg';
import Logo from '../../assets/img/logo.svg'

const SidePac = () => {
    return (
        <div>
            <Router>
                <Route render={({ location, history }) => (
                    <React.Fragment>
                        <SideNav
                            onSelect={(selected) => {
                                const to = '/' + selected;
                                if (location.pathname !== to) {
                                    history.push(to);
                                }
                            }}
                        >
                            <SideNav.Toggle />
                            <SideNav.Nav>
                                <NavItem eventKey="perfil">
                                    <NavIcon>
                                        {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /> */}
                                        <img
                                            src={LogoPerfil}
                                            alt="LogoPerfil"
                                        />
                                    </NavIcon>
                                    <NavText>
                                        MI PERFIL
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="citas">
                                    <NavIcon>
                                        <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                                        <img
                                            src={LogoCitas}
                                            alt="LogoCitas"
                                        />
                                    </NavIcon>
                                    <NavText>
                                        MIS CITAS
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="triaje">
                                    <NavIcon>
                                        <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                                        <img
                                            src={LogoTriaje}
                                            alt="LogoTriaje"
                                        />
                                    </NavIcon>
                                    <NavText>
                                        MI TRIAJE
                                    </NavText>
                                </NavItem>
                            </SideNav.Nav>
                        </SideNav>
                        <main>
                            {/* <Route path="/" exact component={<RootComponent />}/>
                            <Route path="/perfil" component={<Perfil />}/>
                            <Route path="/citas" component={<Citas />} />
                            <Route path="/triaje" component={<Triaje />} /> */}
                        </main>
                    </React.Fragment>
                )}
                />
            </Router>
        </div>
    )
}

export default SidePac;