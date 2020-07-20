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
            hora_inicio: '',
            hora_fin: '',
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
            datoscita.fecha=== ""
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
        <div className="container-flex custom-font">
          <div className="row justify-content-md-center">
            <div className="col-lg-6 col-md-10 col-sm-12">
              <div className="card text-center shadow">
                <div className="card-body custom-colors">
                  <form onSubmit={handleSubmit} className="text-left" id="form_cita">
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <Label for="cita_fecha">Fecha</Label>
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
                        <div className="form-group col-md-4">
                            <Label for="cita_hora_inicio">Hora Inicio</Label>
                            <Input
                            type="text"
                            className="form-control"
                            id="cita_hora_inicio"
                            name="hora_inicio"
                            value={datoscita.hora_inicio}
                            onChange={handleChange}
                            disabled={disabled}
                            autoComplete="off"
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <Label for="cita_hora_fin">Hora Fin</Label>
                            <Input
                            type="text"
                            className="form-control"
                            id="cita_hora_fin"
                            name="hora_fin"
                            value={datoscita.hora_fin}
                            onChange={handleChange}
                            disabled={disabled}
                            autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <Label for="cita_fecha">Motivo</Label>
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
                      <div className="form-group col-md-12">
                        <FullCalendarDiv />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <Button 
                        color="info"
                        type="submit"
                        >
                        Guardar Cita
                      </Button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Button 
                        color="secondary">
                        Cancelar
                      </Button>
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