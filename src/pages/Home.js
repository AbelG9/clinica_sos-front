import React, {useState, Fragment} from 'react';
import Background from '../assets/img/background.svg'
import Background2 from '../assets/img/background2.svg'
import Doctor from '../assets/img/doctor.svg'
import Doctora from '../assets/img/doctora.svg'
import FormYesNo from '../components/FormYesNo';
import Logo from '../assets/img/logo.svg'
import '../assets/styles/Home.css'
import 'bs-stepper/dist/css/bs-stepper.min.css';
import OptionQuestion from "../components/OptionQuestion";
import StepperComponent from "../components/StepperComponent";

const Home = () => {
  const [dataDni, setDataDni] = useState();
  const [page, setPage] = useState(0);
  const [subPage, setSubPage] = useState(1);

  const handleChange = (e) => {
    setDataDni(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(dataDni)
    setPage(1)
  }

  const renderSwitch = (param) => {
    switch(param) {
      case 1:
        return (
            <Fragment>
              <OptionQuestion
                  question="1. ¿Tiene fiebre o la ha tenido en estos ultios 30 dias?"
                  showButton={false}
              />
              <OptionQuestion
                  question="2. ¿Ha tenido problemas respiratorios en los ultimos 14 dias?"
                  showButton={false}
              />
              <OptionQuestion
                  question="3. ¿Ha tenido dolor de garganta en los ultimos 14 dias?"
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
                  question="1. ¿Tiene fiebre o la ha tenido en estos ultios 30 dias?"
                  showButton={true}
                  subPage={subPage}
                  setSubPage={setSubPage}
              />
            </Fragment>
        );
      case 3:
        return (
            <Fragment>
              <OptionQuestion
                  question="1. ¿Tiene fiebre o la ha tenido en estos ultios 30 dias?"
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
              {/* <div className="container h-100 d-flex flex-column justify-content-center align-items-end border"> */}
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
                  <div className="h-100">
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
    default:
      break
  }
}

export default Home;