import React, {useState} from 'react';
import { Label, Input, Button } from "reactstrap";
import {Redirect, useHistory} from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FullCalendarDiv from "./Fullcalendar";

const MySwal = withReactContent(Swal);

const Createcita = () => {
    let history = useHistory();
    const [disabled, setDisabled] = useState(true);
    const [datoscita, setDatoscita] = useState(
        {
            fecha: '',
            hora: '',
            motivo: ''
        }
    );

    const handleChange = (e) => {
        setDatoscita(
            {
                ...datoscita,
                [e.target.name]: e.target.value,
            }
        )
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        ComprobarCampos();
    }

    const ComprobarCampos = () => {
        if (
            datoscita.fecha=== "" ||
            datoscita.hora=== ""
        ) {
          MySwal.fire({
            icon: "warning",
            title: "No escogiste cuando!",
            text: "Te falta seleccionar una fecha y hora en el calendario!",
          });
            } else {
                if (
                    datoscita.motivo === ""
                ) {
                    MySwal.fire({
                    icon: "warning",
                    title: "No dijiste el por qué!",
                    text: "Te falta ingresar el motivo de la cita!",
                    });
                }
                else {
                    //savePatient();
                }
            }
        };

    return(
        <div className="container-flex custom-font" className="overflowdiv">
          <div className="row justify-content-md-center">
            <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12">
              <div className="card text-center shadow">
                <div className="card-body custom-colors">
                  <form onSubmit={handleSubmit} className="text-left" id="form_cita">
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <Label for="cita_fecha" className="labels-calendar">Fecha</Label>
                            <Input
                            type="text"
                            className="form-control"
                            id="cita_fecha"
                            name="fecha"
                            value={datoscita.fecha}
                            onChange={handleChange}
                            disabled={disabled}
                            autoComplete="off"
                            />
                        </div>
                        <div className="form-group col-md-2">
                            <Label for="cita_hora" className="labels-calendar">Hora</Label>
                            <Input
                            type="text"
                            className="form-control"
                            id="cita_hora"
                            name="hora"
                            value={datoscita.hora}
                            onChange={handleChange}
                            disabled={disabled}
                            autoComplete="off"
                            />
                        </div>
                        <div className="form-group col-md-8">
                            <Label for="cita_motivo" className="labels-calendar">Motivo</Label>
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
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <Button 
                        color="info"
                        type="submit"
                        >
                        Guardar Cita
                      </Button>
                      {/* &nbsp;&nbsp;&nbsp;&nbsp;
                      <Button 
                        color="secondary">

                        Cancelar
                      </Button> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}
export default Createcita;