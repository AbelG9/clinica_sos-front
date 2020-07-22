import React, { useState } from "react";
import { Label, Input, Button } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FullCalendarDiv from "./Fullcalendar";
import url from "../../config";
import Axios from "axios";

const MySwal = withReactContent(Swal);

const Createcita = () => {
  const dataStorage = JSON.parse(localStorage.getItem('data')).paciente_id_paciente || '';
  const [datoscita, setDatoscita] = useState({
    fecha: "",
    hora: "",
    motivo: "",
    hora_inicial: "",
    paciente_id_paciente: dataStorage,
  });

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

  const handleEvents = (e) => {
    // let CalendarApi;
    //     CalendarApi.addEvent({
    //       title: 'hola',
    //       start: '2020-07-21 18:00:00'
    //     });
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
        saveCita();
      }
    }
  };

  const saveCita = async () => {
    console.log(datoscita);
    let rescita = await Axios.post(`${url}api/citas/saveCitaOnline`, {
      datoscita,
    });
    let respq = await rescita.data;
    console.log(respq);
    if (respq > 0) {
      MySwal.fire({
        icon: "success",
        title: "Exito!",
        text: "Datos de cita guardados exitosamente",
      });
    } else {
      MySwal.fire({
        icon: "warning",
        title: "Error!",
        text: "No se pudo guardar!",
      });
    }
  };

  return (
    <div className="container-flex custom-font overflowdiv">
      <div className="row justify-content-md-center">
        <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12">
          <div className="card text-center shadow">
            <div className="card-body custom-colors">
              <form
                onSubmit={handleSubmit}
                className="text-left"
                id="form_cita"
              >
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
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12 text-center">
                    <FullCalendarDiv
                      datoscita={datoscita}
                      setDatoscita={setDatoscita}
                      handleEvents={handleEvents}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <Button color="info" type="submit">
                    Guardar Cita
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Createcita;
