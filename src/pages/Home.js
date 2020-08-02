import React, { useState, Fragment, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Background from "../assets/img/background.svg";
import Doctor2 from "../assets/img/2-doctors.svg";
import DoctorTesting from "../assets/img/doctor-testing.svg";
import DoctorPaciente from "../assets/img/doctor-paciente.svg";
import DoctorPresent from "../assets/img/doctor-present.svg";
import DoctorResult from "../assets/img/doctor-result.svg";
import DniCard from "../assets/img/dni-card.png";
import FormYesNo from "../components/FormYesNo";
import Logo from "../assets/img/logo.svg";
import "../assets/styles/Home.css";
import "bs-stepper/dist/css/bs-stepper.min.css";
import RegisterData from './Register';
import '../assets/styles/Home.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import OptionQuestion from "../components/OptionQuestion";
import StepperComponent from "../components/StepperComponent";
import Axios from "axios";
import url from "../config";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ToggleSwitch from "../components/ToggleSwitch";
import { Button, FormGroup, Label, Input } from 'reactstrap';
import Loader from '../components/Loader';
import { Redirect, useHistory } from "react-router-dom";

const MySwal = withReactContent(Swal);

const Home = () => {
  const { state } = useContext(AuthContext);
  const idpacStorage = state.data.paciente_id_paciente;
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [dataDni, setDataDni] = useState("");
  const [page, setPage] = useState(0);
  const [subPage, setSubPage] = useState(1);
  const [stateOption, setStateOption] = useState({
    usuario: 0,
    option1: "no",
    option2: "no",
    option3: "no",
    option4: "no",
    option5: "no",
    option6: "no",
    option61: "no",
    option7: "",
    option8: "",
  });
  const [triajedays, settriajedays] = useState(0);

  useEffect(() => {
    if (state.AuthStatus) {
      setLoading(true);
      getDniPatient(idpacStorage);
    }
  }, []);

  const handleStateOption = (e) => {
    setStateOption({
      ...stateOption,
      [e.target.name]: e.target.value,
    });
  };

  const getDniPatient = async (idpacStorage) => {
    try {
      let resdni = await Axios.post(`${url}paciente/getdniUserPatient`, { idpacStorage });
      let responsedni = await resdni.data;
      if (responsedni.length > 0){
        let dnipat=responsedni[0].pac_document;
        checkPatient(dnipat);
      }
    }
    catch (error) {
    }
  }

  const checkPatient = async (dataDni) => {
    try {
      setLoading(true);
        let res = await Axios.post(`${url}getPatient`, {dataDni});
        let response = await res.data;
        if (response.length > 0) {
          let responseid = response[0].id_paciente;
            let resdays = await Axios.post(`${url}getlasttriage`, {responseid});
            let responsedays = await resdays.data;
            settriajedays(responsedays);
            setLoading(false);
            if (responsedays>=14){
              setStateOption({
                ...stateOption,
                usuario: responseid,
              });
              setPage(1);
              setLoading(false);
            }
            else{
              setPage(1);
              setSubPage(5);
              setLoading(false);
            }      
        } else {
          MySwal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'DNI no registrado! Desea registrarse?',
            showCancelButton: true,
            confirmButtonColor: '#5bc0de',
            confirmButtonText: 'Si, regístrame!',
            cancelButtonColor: '#d9534f',
            cancelButtonText: 'No, cancelar',
            allowEscapeKey: false,
            allowOutsideClick: false
            }).then((result) => {
              if (result.value) {
                setLoading(false);
                setPage(2);
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                setLoading(false);
              }
            })
        }
        
    } catch (error) {
      setLoading(false);
      console.error(error);
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un DNI valido!',
    })
    }
  }

  const handleChange = (e) => {
    setDataDni(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataDni.length < 8 || dataDni.length > 8) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingrese un DNI valido!",
      });
    } else {
      checkPatient(dataDni);
    }
  };

  const renderImage = () => {
    switch (subPage) {
      case 1:
        return (
          <img
            src={DoctorTesting}
            alt="Fairdent"
            width="200"
          />
        )
      case 2:
        return (
          <img
            src={Doctor2}
            alt="Fairdent"
            width="200"
          />
        )
      case 3:
        return (
          <img
            src={DoctorResult}
            alt="Fairdent"
            width="200"
          />
        )
      default:
        return (
          <img
            src={DoctorPaciente}
            alt="Fairdent"
            width="200"
          />
        )
    }
  }

  const handleClickFin = async () => {
    if (stateOption.option7.length > 0 && stateOption.option8.length > 0) {
      setLoading(true);
      let resq = await Axios.post(`${url}saveTriageHistory`, { stateOption });
      let respq = await resq.data;
      if (respq > 0) {
        setLoading(false);
        MySwal.fire({
            icon: "success",
            title: "Exito!",
            text: "Datos de triaje guardados exitosamente",
        }).then((result) => {
            if (result.value) {
              setSubPage(subPage + 1)
            } else {
              setSubPage(subPage + 1)
            }
        });
    } else {
      setLoading(false);
        MySwal.fire({
            icon: "warning",
            title: "Error!",
            text: "No se pudo guardar!",
        }).then((result) => {
            if (result.value) {
              setPage(0);
            } else {
              setPage(0);
            }
        });
    }
    } else {
      MySwal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Complete todos los campos por favor!",
      });
    }
  } 

  const renderSwitch = (param) => {
    switch (param) {
      case 1:
        return (
          <form
            className="h-100 d-flex flex-column"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="h-100 d-flex flex-column justify-content-around">
              <div className="d-flex flex-column">
                <OptionQuestion question="1. ¿Tiene fiebre o la ha tenido en estos últimos 30 dias?" />
                <ToggleSwitch
                  name="option1"
                  stateOption={stateOption.option1}
                  setStateOption={handleStateOption}
                />
              </div>
              <div className="d-flex flex-column">
                <OptionQuestion question="2. ¿Ha tenido problemas respiratorios en los últimos 14 dias?" />
                <ToggleSwitch
                  name="option2"
                  stateOption={stateOption.option2}
                  setStateOption={handleStateOption}
                />
              </div>
              <div className="d-flex flex-column">
                <OptionQuestion question="3. ¿Ha tenido dolor de garganta en los últimos 14 dias?" />
                <ToggleSwitch
                  name="option3"
                  stateOption={stateOption.option3}
                  setStateOption={handleStateOption}
                />
              </div>
            </div>
            <button
              className="btn btn-primary mt-auto custom-font"
              onClick={() => setSubPage(subPage + 1)}
            >
              Siguiente
            </button>
          </form>
        );
      case 2:
        return (
          <form
            className="h-100 d-flex flex-column"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className=" h-100 d-flex flex-column justify-content-around">
              <div className="d-flex flex-column">
                <OptionQuestion question="4. ¿Ha estado en contacto con alguna persona con los síntomas anteriores descritos o con cuadro respiratorio agudo?" />
                <ToggleSwitch
                  name="option4"
                  stateOption={stateOption.option4}
                  setStateOption={handleStateOption}
                />
              </div>
              <div className="d-flex flex-column">
                <OptionQuestion question="5. ¿Ha estado en contacto con alguna persona con confirmación de coronavirus?" />
                <ToggleSwitch
                  name="option5"
                  stateOption={stateOption.option5}
                  setStateOption={handleStateOption}
                />
              </div>
              <div className="d-flex flex-column">
                <OptionQuestion question="6. ¿Ha pasado por pruebas de descarte de COVID-19?" />
                
                { stateOption.option6 === 'no' ? 
                <ToggleSwitch
                  name="option6"
                  stateOption={stateOption.option6}
                  setStateOption={handleStateOption}
                /> 
                : 
                <div>
                <ToggleSwitch
                  name="option6"
                  stateOption={stateOption.option6}
                  setStateOption={handleStateOption}
                /> 
                  <div>
                    <div className="custom-font">
                      <FormGroup>
                        <Label for="exampleEmail">6.1 ¿Cual fue el resultado?</Label>
                        <ToggleSwitch
                          name="option61"
                          option="option"
                          stateOption={stateOption.option61}
                          setStateOption={handleStateOption}
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
                }
              </div>
            </div>
            <button
              className="btn btn-primary mt-auto custom-font"
              onClick={() => setSubPage(subPage + 1)}
            >
              Siguiente
            </button>
          </form>
        );
      case 3:
        return (
          <form
            className="h-100 d-flex flex-column"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className=" h-100 d-flex flex-column justify-content-around custom-font">
              <div className="d-flex flex-column">
                <OptionQuestion question="7. ¿A que se dedica?" />
                <div>
                  <FormGroup>
                    <Input className="w-50" type="text" name="option7" value={stateOption.option7} onChange={(e) => handleStateOption(e)} />
                  </FormGroup>
                </div>
              </div>
              <div className="d-flex flex-column">
                <OptionQuestion question="8. Lugar de trabajo" />
                <div>
                  <FormGroup>
                    <Input className="w-50" type="text" name="option8" value={stateOption.option8} onChange={(e) => handleStateOption(e)}  />
                  </FormGroup>
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary mt-auto custom-font"
              onClick={() => handleClickFin()}
            >
              Finalizar
            </button>
          </form>
        );
      default:
        let timetriaje;
        if (param===4) {
          timetriaje = <div><h1 className="text-black text-right">El triaje ha terminado</h1></div>;
        }
        else if (param===5) {
          if (triajedays===0) {
            timetriaje = <div><h2 className="text-black text-right">Usted ya realizó su triaje</h2>
            <h2 className="text-black text-right">el día de hoy</h2></div>;
          }
          else if (triajedays===1){
            timetriaje = <div><h2 className="text-black text-right">Usted ya realizó su triaje</h2>
            <h2 className="text-black text-right">el día de ayer</h2></div>;
          }
          else{
            timetriaje = <div><h2 className="text-black text-right">Usted ya realizó su triaje</h2>
            <h2 className="text-black text-right">hace {triajedays} días</h2></div>;
          }
        }
        return(
          <FormGroup tag="fieldset">
            <div className="title-custom-form custom-font">
              {timetriaje}
                <div className="DNIB-Image-Preset">
                  <h2 className="text-black text-left">Recuerde siempre </h2>
                  <h2 className="text-black text-left">traer su DNI para</h2>
                  <h2 className="text-black text-left">su atención</h2>
                  <br />
                  <img
                    className="DNI-Image-preset"
                    src={DniCard}
                    alt="Fairdent"
                  />
                  <br /><br />
                  <small className="text-muted">soporte: +51 930 337 714</small>
                  <Button color="info" className="btn-lg btnperfil-pos" onClick={() => setPage(10)} >Mi Perfil</Button>
                  { state.AuthStatus ? <div></div>: 
                  <Button color="info" className="btn-lg btnsalir-pos" href="/">Salir</Button>
                  }
                </div>
            </div>
          </FormGroup>
        );
    }
  };

  const handleLogin = () => {
    history.push("/login");
  }

  switch (page) {
    case 0:
      return (
        <div>
          <div
            style={{
              background: `url(${Background})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 70%",
              height: "100vh",
            }}
          >
            <div className="container h-100 d-flex flex-column justify-content-center align-items-end">
              <div className="align-self-start">
                <button className="btn btn-lg btn-secondary" onClick={handleLogin}>Ver mi perfil</button>
              </div>
              {
                loading ? <Loader /> 
                : 
                <FormYesNo
                  dataDni={dataDni}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                />
              }
              
              <div className="Image-Preset">
                <img
                  className="Doctor-Image-preset"
                  src={DoctorPresent}
                  alt="Fairdent"
                />
              </div>
              <div className="mt-5 mr-5 d-flex flex-column">
                <img src={Logo} alt="Fairdent" width="200" />
                <small className="text-muted">soporte: +51 930 337 714</small>
              </div>
            </div>
          </div>
        </div>
      );
    case 1:
      return (
        <div className="container-fluid p-5" style={{ height: "100vh" }}>
          <div className="row">
            <a href="/" className="ml-5">
              <img src={Logo} alt="Fairdent" width="200" />
            </a>
          </div>
          <div className="doctor-svg">
            {
              renderImage()
            }
          </div>
          {
            loading ? <Loader /> :
            <Fragment>
              <div className="row spacing">
                <div className="col-12 h-100">
                  <div className="container h-100">{renderSwitch(subPage)}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="bs-stepper">
                    {subPage > 3 ? null : (
                      <StepperComponent setSubPage={setSubPage} subPage={subPage} />
                    )}
                  </div>
                </div>
              </div>
          </Fragment>
          }
          <div className="background-question"></div>
        </div>
      );
    case 2:
          return (
            <RegisterData
              setStateOption={setStateOption}
              stateOption={stateOption}
              setPage={setPage}
              dataDni={dataDni}
            />
          );
    case 10:
        return (
          <Redirect to ="/paciente/perfil" />
        );
    default:
      break;
  }
};

export default Home;
