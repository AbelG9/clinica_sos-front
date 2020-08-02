import React, { useEffect, useState, useContext } from "react";
import { Label, Input, Button, Alert } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FullCalendarDiv from "./Fullcalendar";
import url from "../../config";
import Axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import LoarderCircle from "../../components/LoaderCircle";
import "../../assets/styles/Calendar.css";

const MySwal = withReactContent(Swal);

const Createcita = () => {
  const { state } = useContext(AuthContext);
  const dataStorage = state.data.paciente_id_paciente;
  const [datoscita, setDatoscita] = useState({
    fecha: "",
    hora: "",
    motivo: "",
    hora_inicial: "",
    paciente_id_paciente: dataStorage,
  });
  const [allevents, setAllevents] = useState([]);
  const [usercita, setUsercita] = useState(19);
  const [btndisabled, setBtndisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadcitas = async () => {
    setLoading(true);
    try {
      let rescita = await Axios.post(`${url}citas/getCitas`, { usercita });
      let response = await rescita.data;
      if (response.length > 0) {
        for (let i in response) {
          response[i].title="ocupado"
        }
        setAllevents(response);
      }
      let reslastcita = await Axios.post(`${url}citas/getlastcita`, {
        dataStorage,
      });
      let responselastcita = await reslastcita.data;
      console.log("ultima cita: " + responselastcita[0].id_cita_medica);
      if (responselastcita.length > 0) {
        setBtndisabled(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadcitas();
  }, []);

  const handleChange = (e) => {
    setDatoscita({
      ...datoscita,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ComprobarCampos();
  };

  const ComprobarCampos = () => {
    if (datoscita.fecha === "" || datoscita.hora === "") {
      MySwal.fire({
        icon: "warning",
        title: "No escogiste cuando!",
        text: "Te falta seleccionar una fecha y hora en el calendario!",
      });
    } else {
      if (datoscita.motivo === "") {
        MySwal.fire({
          icon: "warning",
          title: "No dijiste el por qué!",
          text: "Te falta ingresar el motivo de la cita!",
        });
      } else {
        saveCitaConfirm();
      }
    }
  };

  const saveCitaConfirm = () => {
    MySwal.fire({
      icon: "warning",
      title: "Esta seguro?",
      text: "Esta seguro de crear una cita en la fecha y hora escogidas?",
      showCancelButton: true,
      confirmButtonColor: "#5bc0de",
      confirmButtonText: "Si, crea la cita!",
      cancelButtonColor: "#d9534f",
      cancelButtonText: "No, cancelar",
      allowEscapeKey: false,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        saveCita();
      }
    });
  };

  const saveCita = async () => {
    let rescita = await Axios.post(`${url}citas/saveCitaOnline`, {
      datoscita,
    });
    let respq = await rescita.data;
    if (respq > 0) {
      MySwal.fire({
        icon: "success",
        title: "Exito!",
        text: "Datos de cita guardados exitosamente",
      }).then((result) => {
        loadcitas();
        setLoading(false);
      });
    } else {
      MySwal.fire({
        icon: "warning",
        title: "Error!",
        text: "No se pudo guardar!",
      }).then((result) => {
        loadcitas();
        setLoading(false);
      });
    }
  };

  return (
    <div className="container-flex custom-font overflowdiv">
      <div className="row justify-content-md-center">
        <div className="col-xl-11 col-lg-11 col-md-12 col-sm-12">
          <div className="card text-center shadow">
            <div className="card-body">
              { btndisabled ?
                <Alert color="warning" className="labels-calendar">
                  Ya cuentas con
                  <a href="/paciente/listacitas" className="alert-link "> una cita pendiente </a> 
                  de atención!
                </Alert>
              : <div></div>
              }
              {
                loading ? <LoarderCircle /> :
                <form
                onSubmit={handleSubmit}
                className="text-left"
                id="form_cita"
              >
                { btndisabled ? <div></div>:
                <div className="form-row">
                  <div className="form-group col-6 col-md-2 col-lg-2">
                    <Label for="cita_fecha" className="labels-calendar">
                      Fecha
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="cita_fecha"
                      name="fecha"
                      value={datoscita.fecha}
                      onChange={handleChange}
                      disabled={true}
                      autoComplete="off"
                    />
                  </div>
                  <div className="form-group col-6 col-md-2 col-lg-2">
                    <Label for="cita_hora" className="labels-calendar">
                      Hora
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="cita_hora"
                      name="hora"
                      value={datoscita.hora}
                      onChange={handleChange}
                      disabled={true}
                      autoComplete="off"
                    />
                  </div>
                  <div className="form-group col-12 col-md-8 col-lg-8">
                    <Label for="cita_motivo" className="labels-calendar">
                      Motivo
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="cita_motivo"
                      name="motivo"
                      value={datoscita.motivo}
                      onChange={handleChange}
                      disabled={btndisabled}
                      autoComplete="off"
                    />
                  </div>
                </div>
                }
                <div className="form-row calendar-media">
                  <div className="form-group col-md-12 text-center">
                    <FullCalendarDiv
                      datoscita={datoscita}
                      setDatoscita={setDatoscita}
                      allevents={allevents}
                      btndisabled={btndisabled}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <Button 
                    color="info" 
                    type="submit"
                    disabled={btndisabled}>
                    Guardar Cita
                  </Button>
                </div>
              </form>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Createcita;
