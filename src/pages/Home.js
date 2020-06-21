import React from 'react';
import Background from '../assets/img/background.svg'
import FormYesNo from '../components/FormYesNo';
import Logo from '../assets/img/logo.svg'
import '../assets/styles/FormYesNo.css'

const Home = () => {
  return ( 
    <div>
      <div style={{
        border: '2px solid black',
        background: `url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 70%',
        padding: '25px',
        height: '100vh'
      }}>
        {/* <div className="container h-100 d-flex flex-column justify-content-center align-items-end border"> */}
        <div className="container h-100 d-flex flex-column justify-content-center align-items-end border">
          <FormYesNo/>
          <div>
            <img src={Logo} alt="Fairdent" width="200"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;