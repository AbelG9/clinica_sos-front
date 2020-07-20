import React, { useState } from 'react';
import '../assets/styles/Login.css';
import IsoLogo from '../assets/img/isologo.svg';
const Login = () => {

  const [credentials, setCredentials] = useState(
    {
      user: '',
      pass: '',
    }
  );

  const handleChange = (e) => {
    setCredentials(
      {
        ...credentials,
        [e.target.name]: e.target.value,
      }
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="container" style={{ height: '100vh' }}>
      <div className="d-flex justify-content-center h-100">
        <div className="user_card">
          <div className="d-flex justify-content-center">
            <div className="brand_logo_container">
              <img src={IsoLogo} className="brand_logo" alt="Fairdent" />
            </div>
          </div>
          <div className="d-flex justify-content-center form_container">
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <div className="input-group-append">
                  <span className="input-group-text"><i className="fas fa-user"></i></span>
                </div>
                <input 
                  type="text" 
                  name="user" 
                  className="form-control input_user" 
                  value={credentials.user}
                  onChange={handleChange} 
                  placeholder="usuario" 
                />
              </div>
              <div className="input-group mb-2">
                <div className="input-group-append">
                  <span className="input-group-text"><i className="fas fa-key"></i></span>
                </div>
                <input 
                  type="password" 
                  name="pass" 
                  className="form-control input_pass" 
                  value={credentials.pass} 
                  onChange={handleChange} 
                  placeholder="contraseña" 
                />
              </div>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customControlInline" />
                  <label className="custom-control-label" htmlFor="customControlInline">Recuerdame</label>
                </div>
              </div>
                <div className="d-flex justify-content-center mt-3 login_container">
            <button type="submit" name="button" className="btn login_btn">Iniciar sesión</button>
            </div>
            </form>
          </div>
      
          <div className="mt-4">
            <div className="d-flex justify-content-center links">
              ¿Aun no tienes cuenta? <a href="#" className="ml-2">Registrate!</a>
            </div>
            <div className="d-flex justify-content-center links">
              <a href="#">¿Se olvidó la contraseña?</a>
            </div>
          </div>
        </div>
      </div>
	</div>
  );
}

export default Login;