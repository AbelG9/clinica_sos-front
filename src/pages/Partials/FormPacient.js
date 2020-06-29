import React, { useEffect, useState } from "react";
import { Label, Input, Button } from "reactstrap";
import "../../assets/styles/FormPacient.css";
import Axios from "axios";
import url from "../../config";
import Background from "../../assets/img/background.svg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import URL from "../../URL";
const MySwal = withReactContent(Swal);

let dataresponse = "";
let datareniec = "";

const FormPacient = ({ dataDni, setPage }) => {
  //aqui recibo la variable set page

  const dnipac = dataDni;
  const [nompac, setnompac] = useState("");
  const [apelpac, setapelpac] = useState("");
  const [dirpac, setdirpac] = useState("");
  const [fnpac, setfnpac] = useState("");
  const [sexpac, setsexpac] = useState("");
  const [telpac, settelpac] = useState("");
  const [mailpac, setmailpac] = useState("");

  const hsetnompac = (e) => {
    setnompac(e.target.value);
  };
  const hsetapelpac = (e) => {
    setapelpac(e.target.value);
  };

  const hsetdirpac = (e) => {
    setdirpac(e.target.value);
  };

  const hsetfnpac = (e) => {
    setfnpac(e.target.value);
  };

  const hsetsexpac = (e) => {
    setsexpac(e.target.value);
    console.log(sexpac);
  };

  const hsettelpac = (e) => {
    settelpac(e.target.value);
  };

  const hsetmailpac = (e) => {
    setmailpac(e.target.value);
  };

  useEffect(() => {
    const DataPatient = async () => {
      //ejemplo
      let resreniec = await Axios.get(`${URL.url}${dataDni}${URL.token}`); //me avisas si funciona esto, no esToy tan seguro, pero debe ser asi con el metodo GET
      datareniec = await resreniec.data;
      setnompac(datareniec.nombres);
      setapelpac(datareniec.apellidoPaterno + " " + datareniec.apellidoMaterno);
      //console.log(URL.url + dnipac + URL.token)
      let resdata = await Axios.post(`${url}api/getDataPatient`, { dataDni });
      dataresponse = await resdata.data;
      console.log("dataresponse ", dataresponse);
    };
    DataPatient();
  }, []);

  const GuardarPaciente = ({ dataDni }) => {
    console.log(
      "dni: ",
      dnipac,
      "nombre: ",
      nompac,
      "apellido: ",
      apelpac,
      "direccion: ",
      dirpac,
      "fecnac: ",
      fnpac,
      "sexo: ",
      sexpac,
      "tlf: ",
      telpac,
      "mail:",
      mailpac
    );
    if (
      nompac === "" ||
      apelpac === "" ||
      dirpac === "" ||
      fnpac === "" ||
      telpac === ""
    ) {
      MySwal.fire({
        icon: "warning",
        title: "Faltan datos!",
        text: "Te falta llenar algunos campos!",
      });
    } else {
      savePatient();
    }
  };

  const savePatient = async () => {
    let params = {
        dnipac: dnipac,
        nompac: nompac,
        apelpac: apelpac,
        dirpac: dirpac,
        fnpac: fnpac,
        sexpac: sexpac,
        telpac: telpac,
        mailpac: mailpac,
    };
    let ressave = await Axios.post(`${url}api/savePatient`, { params });
    let resp = await ressave.data;
    console.log(resp);
    if (resp > 0) {
        MySwal.fire({
            icon: "success",
            title: "Exito!",
            text: "Datos de paciente guardados exitosamente",
        }).then((result) => {
            if (result.value) {
            setPage(1);
            }
        });;
    } else {
        MySwal.fire({
            icon: "warning",
            title: "Error!",
            text: "No se pudo guardar!",
        }).then((result) => {
            if (result.value) {
            setPage(0);
            }
        });
    }
  };

  //console.log("dataformpacient",dataDni);
  return (
    <div>
      <div
        style={{
          //border: '2px solid black',
          background: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 70%",
          padding: "2px",
          height: "80vh",
        }}
      >
        <div className="container-flex p-1">
          <div className="row justify-content-md-center">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="card text-center shadow">
                <div
                  className="card-header text-uppercase"
                  style={{ backgroundColor: "#a93aad", color: "white" }}
                >
                  <h3>DATOS DE PACIENTE</h3>
                </div>
                <div className="card-body">
                  <form className="text-left" id="form_patient">
                    {/* <div className="form-group d-none">
                                <Label for="id_paciente">ID</Label>
                                <Input type="text" className="form-control" id="id_paciente" required="required" autoComplete="off" disabled="" />
                            </div> */}
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <Label for="pac_document">DNI</Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="pac_document"
                          value={dataDni}
                          disabled
                        />
                      </div>
                      {/* <div className="form-group col-md-8">
                                    <Label for="pac_document">.</Label>
                                        <div className="alert alert-success py-1" id="check_message" role="alert" style={{display: 'none'}}>
                                        </div>
                                </div> */}
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <Label for="pac_name">Nombres</Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="pac_name"
                          required="required"
                          autoComplete="off"
                          onChange={hsetnompac}
                          value={nompac}
                          disabled
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <Label for="pac_lastname">Apellidos</Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="pac_lastname"
                          placeholder=""
                          required="required"
                          autoComplete="off"
                          onChange={hsetapelpac}
                          value={apelpac}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <Label for="pac_address">Dirección</Label>
                      <textarea
                        className="form-control"
                        id="pac_address"
                        onChange={hsetdirpac}
                        value={dirpac}
                      ></textarea>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <Label for="pac_fech_nac">Fecha Nacimiento</Label>
                        <Input
                          type="date"
                          className="form-control"
                          id="pac_fech_nac"
                          autoComplete="off"
                          onChange={hsetfnpac}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <Label for="pac_sex">Sexo</Label>
                        <select
                          className="form-control"
                          id="pac_sex"
                          required
                          onChange={hsetsexpac}
                        >
                          <option value="">Seleccione...</option>
                          <option value="MASCULINO">Masculino</option>
                          <option value="FEMENINO">Femenino</option>
                        </select>
                      </div>
                    </div>
                    {/* <div className="form-group d-none">
                                <Label for="pac_responsible">* Nombre Responsable</Label>
                                <Input type="text" className="form-control" id="pac_responsible" autoComplete="off" />
                            </div> */}
                    <div className="form-row">
                      <div className="form-group col-md-3">
                        <Label for="pac_phone">Telefono</Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="pac_phone"
                          required="required"
                          autoComplete="off"
                          onChange={hsettelpac}
                          value={telpac}
                        />
                      </div>
                      <div className="form-group col-md-9">
                        <Label for="pac_email">Correo</Label>
                        <Input
                          type="email"
                          className="form-control"
                          id="pac_email"
                          onChange={hsetmailpac}
                          value={mailpac}
                        />
                      </div>
                      {/* <div className="form-group col-md-3">
                                    <Label for="pac_estado">* Estado</Label>
                                    <select className="form-control" id="pac_estado" required="required" autoComplete="off">
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                    </select>
                                </div> */}
                    </div>
                    {/* <div className="form-group d-none">
                                <div className="form-check">
                                    <Input className="form-check-input" type="checkbox" id="form21" value="on" checked="checked" required="required" autoComplete="off" />
                                    <Label className="form-check-label" for="form21">Acepto terminos y condiciones</Label>
                                </div>
                            </div> */}
                    <div className="modal-footer">
                      <Button color="info" onClick={GuardarPaciente}>
                        Guardar
                      </Button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Button color="secondary" onClick={() => setPage(0)}>
                        Salir
                      </Button>
                      {/* // aqui usas la variabel (importante () => setPage(0))                           */}
                      {/* <?if(isset($_GET['edit'])):?> */}
                      {/* <Button type="submit" className="btn btn-warning">Actualizar</Button> */}
                      {/* <?else:?> */}
                      {/* <?endif?> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPacient;
