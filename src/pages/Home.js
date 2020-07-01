import React, { useState } from "react";
import Background from "../assets/img/background.svg";
import Doctor2 from "../assets/img/2-doctors.svg";
import DoctorTesting from "../assets/img/doctor-testing.svg";
import DoctorPaciente from "../assets/img/doctor-paciente.svg";
import DoctorPresent from "../assets/img/doctor-present.svg";
import DoctorResult from "../assets/img/doctor-result.svg";
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
import URL from '../URL'

const MySwal = withReactContent(Swal);

const Home = () => {
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

  const handleStateOption = (e) => {
    setStateOption({
      ...stateOption,
      [e.target.name]: e.target.value,
    });
    console.log(stateOption);
  };

  const checkPatient = async (dataDni) => {
    try {
      let resreniec = await Axios.get(`${URL.url}${dataDni}${URL.token}`);
      let datareniec = await resreniec.data;
        let res = await Axios.post(`${url}api/getPatient`, {dataDni});
        let response = await res.data;
        //console.log(response);
        if (response.length > 0) {
          let responseid = response[0].id_paciente;
            let resdays = await Axios.post(`${url}api/getlasttriage`, {responseid});
            let responsedays = await resdays.data;
            console.log(responsedays);
            if (responsedays>=14){
              setStateOption({
                ...stateOption,
                usuario: responseid,
              });
              setPage(1);
            }
            else{
              setPage(1);
              setSubPage(4);
            }      
        } else {
          setPage(2);
        }
    } catch (error) {
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
      let resq = await Axios.post(`${url}api/saveTriageHistory`, { stateOption });
      console.log("resquestions: ",resq);
      let respq = await resq.data;
      console.log("respuesta questions: ",respq);
      if (respq > 0) {
        MySwal.fire({
            icon: "success",
            title: "Exito!",
            text: "Datos de triaje guardados exitosamente",
        }).then((result) => {
            if (result.value) {
              setSubPage(subPage + 1)
            }
        });;
    } else {
        MySwal.fire({
            icon: "warning",
            title: "Error!",
            text: "No se pudo guardar!",
        }).then((result) => {
            if (result.value) {
            //setPage(0);
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
              className="btn btn-primary mt-auto"
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
                    <div>
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
              className="btn btn-primary mt-auto"
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
            <div className=" h-100 d-flex flex-column justify-content-around">
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
              className="btn btn-primary mt-auto"
              onClick={() => handleClickFin()}
            >
              Finalizar
            </button>
          </form>
        );
      default:
        return(
          <FormGroup tag="fieldset">
            <div className="title-custom-form">
                <h2 className="text-black text-right">El triaje ha terminado</h2>
            </div>
            <div className="d-flex justify-content-end">
                <Button color="secondary" className="btn-lg" href="/">Salir</Button>
            </div>
          </FormGroup>
        );
    }
  };

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
              <FormYesNo
                dataDni={dataDni}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
              <div className="Image-Preset">
                <img
                  className="Doctor-Image-preset"
                  src={DoctorPresent}
                  alt="Fairdent"
                />
              </div>
              <div className="mt-5 mr-5">
                <img src={Logo} alt="Fairdent" width="200" />
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
          <div className="background-question"></div>
        </div>
      );
    case 2:
          return (
            <RegisterData
              setStateOption={setStateOption}
              stateOption={stateOption}
              setPage={setPage} //jalas la variable de Home al componente Register
              dataDni={dataDni}
            />
          );
    default:
      break;
  }
};

export default Home;
