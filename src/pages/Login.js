import React, { useState, useContext } from "react";
import "../assets/styles/Login.css";
import IsoLogo from "../assets/img/isologo.svg";
import { useHistory, Redirect, Link } from "react-router-dom";
import URL from "../config";
import Axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import LoaderCircle from "../components/LoaderCircle";

const Login = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const [credentials, setCredentials] = useState({
    user: "",
    pass: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res = await Axios.post(`${URL}paciente/login`, { credentials });
      let response = await res.data;
      console.log(response);
      if (response.success) {
        setCredentials({
          dni: "",
          name: "",
          lastname: "",
          address: "",
          fechanac: "",
          genre: "male",
          phone: "",
          email: "",
          pass: "",
          repass: "",
        });
        dispatch({ type: "SIGNIN", payload: response.user });
        history.push("/paciente/obtenercita");
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (!state.AuthStatus) {
    return (
      <div className="container" style={{ height: "100vh" }}>
        <div className="d-flex justify-content-center h-100">
          <div className="user_card">
            <div className="d-flex justify-content-center">
              <div className="brand_logo_container">
                <img src={IsoLogo} className="brand_logo" alt="Fairdent" />
              </div>
            </div>
            <div className="d-flex justify-content-center form_container">
              {loading ? (
                <LoaderCircle />
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-user"></i>
                      </span>
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
                      <span className="input-group-text">
                        <i className="fas fa-key"></i>
                      </span>
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
                  {/* <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customControlInline" />
                    <label className="custom-control-label" htmlFor="customControlInline">Recuerdame</label>
                  </div>
                </div> */}
                  <div className="d-flex justify-content-center mt-3 login_container">
                    <button
                      type="submit"
                      name="button"
                      className="btn login_btn"
                    >
                      Iniciar sesión
                    </button>
                  </div>
                  <div className="mt-4">
                    <div className="d-flex justify-content-center links">
                      <small>
                        ¿Aun no tienes cuenta?{" "}
                        <Link to="/register" className="ml-2">
                          Registrate!
                        </Link>
                      </small>
                    </div>
                    <div className="d-flex justify-content-center links">
                      <small>
                        <Link to="/">¿Se olvidó la contraseña?</Link>
                      </small>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="paciente/obtenercita" />;
  }
};

export default Login;
