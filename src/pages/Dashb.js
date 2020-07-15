import React from 'react';
import NavPac from './Partials/Navbar';
import SidePac from './Partials/Sidebar';
import WelcomePac from './Partials/Welcome';

const Dashb = ({dataDni, setPage}) => {
    return (
        <div>
            <NavPac />
            <SidePac />
            <WelcomePac 
                setPage={setPage}
                dataDni={dataDni}
            />
        </div>
    )
}

export default Dashb;