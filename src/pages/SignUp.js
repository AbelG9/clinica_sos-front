import React, { useState } from 'react';
import '../assets/styles/Login.css';
import IsoLogo from '../assets/img/isologo.svg';
import { useHistory, Link } from "react-router-dom";
import URL from '../config';
import Axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const SignUp = () => {
  const MySwal = withReactContent(Swal)
  let history = useHistory();
  const [stepSignUp, setStepSignUp] = useState(1);
  const [credentials, setCredentials] = useState({
    idpatient: '',
    dni: '',
    name: '',
    lastname: '',
    address: '',
    fechanac: '',
    genre: 'male',
    phone: '',
    email: '',
    pass: '',
    repass: '',
  });

  const handleChange = (e) => {
    setCredentials(
      {
        ...credentials,
        [e.target.name]: e.target.value,
      }
    );
  }

  const handleChangeGenre = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmitNext = async (e) => {
    e.preventDefault();
    if (credentials.dni.length === 8) {
      try {
        let res = await Axios.post(`${URL}api/paciente/checkPatient`, {credentials});
        let response = await res.data;
        console.log(response);
        if (response.success) {
          if (response.stepPage === 3) {
            setCredentials({
              ...credentials,
              idpatient: response.id_patient
            });
            setStepSignUp(response.stepPage);
          } else {
            setStepSignUp(response.stepPage);
          }
        } else {
          history.push("/login");
        }
      } catch (e) {
          console.log(e)
      }
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Llene el campo D.N.I. por favor!',
      });
    }
  }

  const handleSubmitNext2 = (e) => {
    e.preventDefault();
    setStepSignUp(3);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.email.length > 0 && credentials.pass.length > 0 && credentials.repass.length > 0) {
      if (credentials.pass  !== credentials.repass) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Las contraseñas no coinciden...',
        });
      } else {
        try {
          let res = await Axios.post(`${URL}api/paciente/register`, {credentials});
          let response = await res.data;
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'registro exitoso!',
          })
          setCredentials({
            dni: '',
            name: '',
            lastname: '',
            address: '',
            fechanac: '',
            genre: 'male',
            phone: '',
            email: '',
            pass: '',
            repass: '',
          });
          setStepSignUp(1);
          history.push("/login");
        } catch (e) {
            console.log(e)
        }
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Llene todos los campos por favor!',
      });
    }
  }

  const handleLogin = () => {
    setCredentials({
      dni: '',
      name: '',
      lastname: '',
      address: '',
      fechanac: '',
      genre: 'male',
      phone: '',
      email: '',
      pass: '',
      repass: '',
    });
    setStepSignUp(1);
    // history.push("/login");
  }

  const renderSignUp = () => {
    switch (stepSignUp) {
      case 1:
        return (
          <form onSubmit={handleSubmitNext}>
            <div className="input-group mb-3">
              <div className="input-group-append">
                <span className="input-group-text"><i className="fas fa-address-card"></i></span>
              </div>
              <input 
                maxLength={8}
                type="text" 
                name="dni" 
                className="form-control input_user" 
                value={credentials.dni}
                onChange={handleChange} 
                placeholder="D.N.I."
              />
            </div>
            <div className="d-flex justify-content-center mt-3 login_container">
              <button type="submit" name="button" className="btn login_btn">Siguiente</button>
            </div>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleSubmitNext2}>
            <div className="input-group mb-3">
              <div className="input-group-append">
                <span className="input-group-text"><i className="fas fa-user"></i></span>
              </div>
              <input 
                type="text" 
                name="name" 
                className="form-control input_user" 
                value={credentials.name}
                onChange={handleChange} 
                placeholder="nombre" 
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-append">
                <span className="input-group-text"><i className="fas fa-user"></i></span>
              </div>
              <input 
                type="text" 
                name="lastname" 
                className="form-control input_user" 
                value={credentials.lastname}
                onChange={handleChange} 
                placeholder="apellidos" 
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-append">
                <span className="input-group-text"><i className="fas fa-map-marker-alt"></i></span>
              </div>
              <input 
                type="text" 
                name="address" 
                className="form-control input_user" 
                value={credentials.address}
                onChange={handleChange} 
                placeholder="dirección" 
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-append">
                <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
              </div>
              <input 
                type="date" 
                name="fechanac" 
                className="form-control input_user" 
                value={credentials.fechanac}
                onChange={handleChange} 
                placeholder="fecha de nacimiento" 
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-append">
                <span className="input-group-text"><i className="fas fa-venus-mars"></i></span>
              </div>
              <div className="form-check input_user mx-3">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="male" 
                  id="genre" 
                  value="male" 
                  checked={credentials.genre === 'male'}
                  onChange={handleChangeGenre}
                />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  M
                </label>
              </div>
              <div className="form-check input_user">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="female" 
                  id="genre" 
                  value="female" 
                  checked={credentials.genre === 'female'}
                  onChange={handleChangeGenre}
                />
                <label className="form-check-label" htmlFor="exampleRadios2">
                  F
                </label>
              </div>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-append">
                <span className="input-group-text"><i className="fas fa-phone-alt"></i></span>
              </div>
              <input
                maxLength={9}
                type="text" 
                name="phone" 
                className="form-control input_user" 
                value={credentials.phone}
                onChange={handleChange} 
                placeholder="celular" 
              />
            </div>
            <div className="d-flex justify-content-center mt-3 login_container">
              <button type="submit" name="button" className="btn login_btn">Siguiente</button>
            </div>
          </form>
        )
      case 3:
          return (
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <div className="input-group-append">
                  <span className="input-group-text"><i className="fas fa-user"></i></span>
                </div>
                <input 
                  type="email" 
                  name="email" 
                  className="form-control input_user" 
                  value={credentials.email}
                  onChange={handleChange} 
                  placeholder="email" 
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
              <div className="input-group mb-2">
                <div className="input-group-append">
                  <span className="input-group-text"><i className="fas fa-key"></i></span>
                </div>
                <input 
                  type="password" 
                  name="repass" 
                  className="form-control input_pass" 
                  value={credentials.repass} 
                  onChange={handleChange} 
                  placeholder="repetir contraseña" 
                />
              </div>
              <div className="d-flex justify-content-center mt-3 login_container">
                <button type="submit" name="button" className="btn login_btn">Registrarse</button>
              </div>
            </form>
          );
      default:
        break;
    }
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
            {renderSignUp()}
          </div>
          <div className="mt-4">
            <div className="d-flex justify-content-center links">
              <small>¿Ya tienes una cuenta? <Link to="/login" onClick={handleLogin} className="ml-2">Logueate!</Link></small>
            </div>
          </div>
        </div>
      </div>
	</div>
  );
}

export default SignUp;