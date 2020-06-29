import React, {useState, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import RegisterData from './Register';
import Background from '../assets/img/background.svg'
import Background2 from '../assets/img/background2.svg'
import Doctor from '../assets/img/doctor.svg'
import Doctora from '../assets/img/doctora.svg'
import FormYesNo from '../components/FormYesNo';
import Logo from '../assets/img/logo.svg'
import '../assets/styles/Home.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import OptionQuestion from "../components/OptionQuestion";
import TextQuestion from "../components/TextQuestion";
import StepperComponent from "../components/StepperComponent";
import Axios from 'axios';
import url from "../config";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import URL from '../URL'

const MySwal = withReactContent(Swal)

const Home = () => {
  const [dataDni, setDataDni] = useState('');//cambiar dni por comillas simples
  const [page, setPage] = useState(0);//cambiar page por 0
  const [subPage, setSubPage] = useState(1);

    const checkPatient = async (dataDni) => {
      try {
        let resreniec = await Axios.get(`${URL.url}${dataDni}${URL.token}`);  //me avisas si funciona esto, no esToy tan seguro, pero debe ser asi con el metodo GET
        let datareniec = await resreniec.data;
        //console.log(datareniec);
        //if (datareniec=!"") {
          let res = await Axios.post(`${url}api/getPatient`, {dataDni});
          let response = await res.data;
          //console.log(response);
          if (response > 0) {
            setPage(1);
          } else {
            setPage(2);
          }
        //}
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
    setDataDni(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataDni.length < 8 || dataDni.length >8) {
        MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese un DNI valido!',
        })
    } else {
        checkPatient(dataDni);
    }
  }

  const renderSwitch = (param) => {
    switch(param) {
      case 1:
        return (
            <Fragment>
              <OptionQuestion
                  question="1. ¿Tiene fiebre o la ha tenido en estos ultimos 14 dias?"
                  numquestion={1}
                  showButton={false}
              />
              <OptionQuestion
                  question="2. ¿Ha tenido problemas respiratorios en los ultimos 14 dias?"
                  numquestion={2}
                  showButton={false}
              />
              <OptionQuestion
                  question="3. ¿Ha tenido dolor de garganta en los ultimos 14 dias?"
                  numquestion={3}
                  showButton={true}
                  subPage={subPage}
                  setSubPage={setSubPage}
              />
            </Fragment>
        );
      case 2:
        return (
            <Fragment>
              <OptionQuestion
                  question="4. ¿Ha estado en contacto con alguna persona con los sintomas anteriores descritos o con cuadro respiratorio agudo?"
                  numquestion={4}
                  showButton={false}
              />
              <OptionQuestion
                  question="5. ¿Ha estado en contacto con alguna persona con confirmacion de coronavirus?"
                  numquestion={5}
                  showButton={false}
              />
              <OptionQuestion
                  question="6. ¿Ha pasado por pruebas de descarte de COVID-19?"
                  numquestion={6}
                  showButton={true}
                  subPage={subPage}
                  setSubPage={setSubPage}
              />
            </Fragment>
        );
      case 3:
        return (
            <Fragment>
              <TextQuestion
                  question="7. ¿A que se dedica?"
                  numquestion={7}
                  showButton={false}
              />
              <TextQuestion
                  question="8. Lugar de trabajo"
                  numquestion={8}
                  showButton={true}
                  subPage={subPage}
                  setSubPage={setSubPage}
              />
            </Fragment>
        );
      default:
        return (
            <OptionQuestion
                // question="FIN!"
                showButton={false}
            />
        );
    }
  }

  switch (page) {
    case 0:
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
              <div className="container h-100 d-flex flex-column justify-content-center align-items-end">
                <FormYesNo
                    dataDni={dataDni}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
                <div className="mt-5 mr-5">
                  <img src={Logo} alt="Fairdent" width="200"/>
                </div>
              </div>
            </div>
          </div>
      );
    case 1:
      return (
          <div>
            <div style={{
              border: '2px solid black',
              background: `url(${Background2})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
              padding: '25px',
              height: '100vh'
            }}>
              <div className="container h-100 ">
                <div>
                  <img src={Logo} alt="Fairdent" width="200"/>
                </div>
                <div className="image-svg">
                  <img src={ subPage === 2 ? Doctora : Doctor } alt="Fairdent" width="200"/>
                </div>
                <div id="stepper1" className="bs-stepper h-75">
                  <div className="h-100 w-50">
                    <div className="bs-stepper-content">
                      { renderSwitch(subPage) }
                    </div>
                  </div>
                  {
                    subPage > 3 ? null :
                        <StepperComponent
                            setSubPage={setSubPage}
                            subPage={subPage}
                        />
                  }

                </div>
              </div>
            </div>
          </div>
      );
      case 2:
          return (
            <RegisterData 
              setPage={setPage} //jalas la variable de Home al componente Register
              dataDni={dataDni}
            />
          );
    default:
      break
  }
}

export default Home;