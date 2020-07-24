import React, {useState} from 'react';
import { Label, Input, Button } from "reactstrap";

const Listacitas = () => { 

    const [datoscita, setDatoscita] = useState(
        {
            idpaciente: '',
            fecha: '',
            hora: '',
            motivo: '',
            hora_inicial: '',
            hora_fin: '',
        }
    );

    return(
        <div className="container-flex custom-font overflowdiv">
          <div className="row justify-content-md-center">
            <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12">
              <div className="card text-center shadow">
                <div className="card-body custom-colors">
                  <form className="text-left" id="form_cita">
                    <div className="form-row">
                        <div className="form-group col-6 col-md-2 col-lg-2">
                            <Label for="cita_fecha" className="labels-calendar">Fecha</Label>
                            <Input
                            type="text"
                            className="form-control"
                            id="cita_fecha"
                            name="fecha"
                            value={datoscita.fecha}
                            //onChange={handleChange}
                            disabled={true}
                            autoComplete="off"
                            />
                        </div>
                        <div className="form-group col-6 col-md-2 col-lg-2">
                            <Label for="cita_hora" className="labels-calendar">Hora</Label>
                            <Input
                            type="text"
                            className="form-control"
                            id="cita_hora"
                            name="hora"
                            value={datoscita.hora}
                            //onChange={handleChange}
                            disabled={true}
                            autoComplete="off"
                            />
                        </div>
                        <div className="form-group col-12 col-md-8 col-lg-8">
                            <Label for="cita_motivo" className="labels-calendar">Motivo</Label>
                            <Input
                            type="text"
                            className="form-control"
                            id="cita_motivo"
                            name="motivo"
                            value={datoscita.motivo}
                            //onChange={handleChange}
                            disabled={true}
                            autoComplete="off"
                            />
                        </div>
                    </div>
                    {/* <div className="modal-footer">
                      <Button 
                        color="info"
                        type="submit"
                        disabled={btndisabled}
                        >
                        Guardar Cita
                      </Button>
                      {/* &nbsp;&nbsp;&nbsp;&nbsp;
                      <Button 
                        color="secondary">

                        Cancelar
                      </Button>
                    </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}
export default Listacitas;