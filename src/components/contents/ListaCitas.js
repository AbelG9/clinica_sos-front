import React, {useEffect, useState, useContext} from 'react';
import { Label, Input, Button } from "reactstrap";
import url from "../../config";
import Axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import TableCita from "./TablaCitas";

const Listacitas = () => { 
    const { state } = useContext(AuthContext);
    const dataStorage = state.data.paciente_id_paciente;
    const [datoslastcita, setDatoslastcita]= useState(
      {
        id: "",
        fecha: "",
        hora: "",
        motivo: "",
        paciente_id_paciente: dataStorage,
      }
    )

    const loadlastcitapatient = async () => {
      try {
        let reslastcita = await Axios.post(`${url}api/citas/getlastcita`, { dataStorage });
        let responselastcita = await reslastcita.data;
        let fechainicial=responselastcita[0].cme_fech_inicial;
        let currentFecha=fechainicial.slice(0,10);
        let currentHora=fechainicial.slice(11,19);
        if (responselastcita.length > 0) {
          setDatoslastcita({
            id: responselastcita[0].id_cita_medica,
            fecha: currentFecha,
            hora: currentHora,
            motivo: responselastcita[0].cme_titulo,
          });
          
        }

      } catch (error) {
      }
    };
  
    useEffect(() => {
      loadlastcitapatient();
    }, []);

    return(
        <div className="container-flex custom-font overflowdiv">
          <div className="row justify-content-md-center">
            <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12">
              <div className="card text-center shadow">
                <div className="card-body custom-colors">
                  <h3 className="labels-calendar">
                    CITA PENDIENTE
                  </h3>
                  <form className="text-left" id="form_cita">
                    <div className="form-row">
                        <div className="form-group col-6 col-md-2 col-lg-2">
                            <Label for="cita_fecha" className="labels-calendar">Fecha</Label>
                            <Input
                            type="text"
                            className="form-control"
                            id="cita_fecha"
                            name="fecha"
                            value={datoslastcita.fecha}
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
                            value={datoslastcita.hora}
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
                            value={datoslastcita.motivo}
                            disabled={true}
                            autoComplete="off"
                            />
                        </div>
                    </div>
                  </form>
                  <br />
                  <TableCita
                    dataStorage={dataStorage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}
export default Listacitas;