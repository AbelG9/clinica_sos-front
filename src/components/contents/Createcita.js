import React, {useEffect, useState} from 'react';
import { Label, Input, Button } from "reactstrap";
import {useHistory} from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FullCalendarDiv from "./Fullcalendar";
import url from "../../config";
import Axios from "axios";
import Loader from "../../components/Loader";

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
    let history = useHistory();
    const [allevents, setAllevents] = useState([]);
    const [usercita, setUsercita] = useState(33);
    const [idpaciente, setIdpaciente] = useState(1009);
    const [btndisabled, setBtndisabled] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [datoscita, setDatoscita] = useState(
        {
            idpaciente: idpaciente,
            fecha: '',
            hora: '',
            motivo: '',
            hora_inicial: '',
            hora_fin: '',
        }
    );
    
    useEffect(() => {
      const loadcitas = async () => {
        setLoading(true);
        try {
          let rescita = await Axios.post(`${url}api/citas/getCitas`, {usercita});
          let response = await rescita.data;
          if (response.length > 0) {
            setAllevents(response);
          }
          let reslastcita = await Axios.post(`${url}api/citas/getlastcita`, {idpaciente});
          let responselastcita = await reslastcita.data;
          console.log("ultima cita: "+responselastcita[0].id_cita_medica);
          if (responselastcita.length>0) {
            setBtndisabled(true);
            setLoading(true);
            MySwal.fire({
              icon: "warning",
              title: "Tienes una cita pendiente!",
              text: "Ya cuentas con una cita pendiente de atención!",
              showCancelButton: true,
              confirmButtonColor: '#5bc0de',
              confirmButtonText: 'Ver mi cita!',
              cancelButtonColor: '#d9534f',
              cancelButtonText: 'OK, dejalo ahí',
              allowEscapeKey: false,
              allowOutsideClick: false
              }).then((result) => {
                if (result.value) {
                  history.push('/paciente/listacitas');
                  setLoading(false);
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  setLoading(false);
                }
              })
          }
        } catch (error) {
          setLoading(false);
        }
      };
      loadcitas();
    }, [usercita]);

  const handleChange = (e) => {
    setDatoscita({
      ...datoscita,
      [e.target.name]: e.target.value,
    });
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
                  saveCitaConfirm();
                }
            }
        };

        const saveCitaConfirm = () => {
          setLoading(true);
          MySwal.fire({
            icon: 'warning',
            title: 'Esta seguro?',
            text: 'Esta seguro de crear una cita en la fecha y hora escogidas?',
            showCancelButton: true,
            confirmButtonColor: '#5bc0de',
            confirmButtonText: 'Si, crea la cita!',
            cancelButtonColor: '#d9534f',
            cancelButtonText: 'No, cancelar',
            allowEscapeKey: false,
            allowOutsideClick: false
            }).then((result) => {
              if (result.value) {
                saveCita();
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                setLoading(false);
              }
            })
          };

          const saveCita = async () => {
            console.log(datoscita);
            let rescita = await Axios.post(`${url}api/citas/saveCitaOnline`, { datoscita });
            let respq = await rescita.data;
            if (respq > 0) {
              MySwal.fire({
                  icon: "success",
                  title: "Exito!",
                  text: "Datos de cita guardados exitosamente",
              }).then((result) => {
                window.location.reload(false);
                setLoading(false);
              })
          } else {
              MySwal.fire({
                  icon: "warning",
                  title: "Error!",
                  text: "No se pudo guardar!",
              }).then((result) => {
                window.location.reload(false);
                setLoading(false);
              })
          }
        };

    return(
      loading ? <Loader /> :
        <div className="container-flex custom-font overflowdiv">
          <div className="row justify-content-md-center">
            <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12">
              <div className="card text-center shadow">
                <div className="card-body custom-colors">
                  <form onSubmit={handleSubmit} className="text-left" id="form_cita">
                    <div className="form-row">
                        <div className="form-group col-6 col-md-2 col-lg-2">
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
                        <div className="form-group col-6 col-md-2 col-lg-2">
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
                        <div className="form-group col-12 col-md-8 col-lg-8">
                            <Label for="cita_motivo" className="labels-calendar">Motivo</Label>
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
                    <div className="form-row">
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
                        disabled={btndisabled}
                        >
                        Guardar Cita
                      </Button>
                      {/* &nbsp;&nbsp;&nbsp;&nbsp;
                      <Button 
                        color="secondary">

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
