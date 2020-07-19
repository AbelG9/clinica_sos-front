import React, {useState} from "react";
import { Label, Input, Button } from "reactstrap";
import {Redirect, useHistory} from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Profile = () => {
    let history = useHistory();
    const [disabled, setDisabled] = useState(false);
    const [datospaciente, setDatospaciente] = useState(
        {
            dni: '',
            nombres: '',
            apellidos: '',
            direccion: '',
            fechanac: '',
            sexo: '',
            telefono: '',
            email: ''
        }
    );

    const handleChange = (e) => {
        setDatospaciente(
            {
                ...datospaciente,
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
        datospaciente.dni=== "" ||
        datospaciente.nombres=== "" ||
        datospaciente.apellidos=== "" ||
        datospaciente.direccion=== "" ||
        datospaciente.telefono=== ""
    ) {
      MySwal.fire({
        icon: "warning",
        title: "Faltan datos!",
        text: "Te falta llenar algunos campos!",
      });
        } else {
            if (
                datospaciente.telefono.length>9 ||
                datospaciente.telefono.length<9
            ) {
                MySwal.fire({
                icon: "warning",
                title: "Número incorrecto!",
                text: "Ingresa un número de teléfono correcto!",
                });
            }
            else {
                //savePatient();
            }
        }
    };

    // const checkPatient = async (dataDni) => {
    //     try {
    //       //setLoading(true);
    //         let res = await Axios.post(`${url}api/getPatient`, {dataDni});
    //         let response = await res.data;
    //         if (response.length > 0) {
    //           //poner datos en campos  
    //         } else {
    //           //se supone q se encuentran datos
    //         }
            
    //     } catch (error) {
    //       setLoading(false);
    //       console.error(error);
    //       MySwal.fire({
    //         icon: 'error',
    //         title: 'Oops...',
    //         text: 'Ha ocurrido un error imprevisto!',
    //     })
    //     }
    //   }
//   const savePatient = async () => {
//     setLoading(true);
//     let params = {
//       dnipac: dnipac,
//       nompac: nompac,
//       apelpac: apelpac,
//       dirpac: dirpac,
//       fnpac: fnpac,
//       sexpac: sexpac,
//       telpac: telpac,
//       mailpac: mailpac,
//     };
//     let ressave = await Axios.post(`${url}api/savePatient`, { params });
//     let resp = await ressave.data;
//     if (resp > 0) {
//       setLoading(false);
//       MySwal.fire({
//         icon: "success",
//         title: "Exito!",
//         text: "Datos de paciente guardados exitosamente",
//       });
//     } else {
//       setLoading(false);
//       MySwal.fire({
//         icon: "warning",
//         title: "Error!",
//         text: "No se pudo guardar!",
//       });
//     }
//   };
    return (
        <div className="container-flex custom-font">
          <div className="row justify-content-md-center">
            <div className="col-lg-6 col-md-10 col-sm-12">
              <div className="card text-center shadow">
                <div className="card-body custom-colors">
                  <form onSubmit={handleSubmit} className="text-left" id="form_patient">
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <Label for="pac_document">DNI</Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="pac_document"
                          name="dni"
                          value={datospaciente.dni}
                          onChange={handleChange}
                          disabled={disabled}
                          required
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <Label for="pac_name">Nombres</Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="pac_name"
                          name="nombres"
                          value={datospaciente.nombres}
                          onChange={handleChange}
                          disabled={disabled}
                          required
                          autoComplete="off"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <Label for="pac_lastname">Apellidos</Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="pac_lastname"
                          name="apellidos"
                          value={datospaciente.apellidos}
                          onChange={handleChange}
                          disabled={disabled}
                          required
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <Label for="pac_address">Dirección</Label>
                      <textarea
                        className="form-control"
                        id="pac_address"
                        name="direccion"
                        value={datospaciente.direccion}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                      ></textarea>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <Label for="pac_fech_nac">Fecha Nacimiento</Label>
                        <Input
                          type="date"
                          className="form-control"
                          id="pac_fech_nac"
                          name="fechanac"
                          value={datospaciente.fechanac}
                          onChange={handleChange}
                          autoComplete="off"  
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <Label for="pac_sex">Sexo</Label>
                        <select
                          className="form-control"
                          id="pac_sex"
                          name="sexo"
                          required
                          onChange={handleChange}
                        >
                          <option value="">Seleccione...</option>
                          <option value="MASCULINO">Masculino</option>
                          <option value="FEMENINO">Femenino</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-3">
                        <Label for="pac_phone">Telefono</Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="pac_phone"
                          name="telefono"
                          value={datospaciente.telefono}
                          onChange={handleChange}
                          required
                          autoComplete="off"
                        />
                      </div>
                      <div className="form-group col-md-9">
                        <Label for="pac_email">Correo</Label>
                        <Input
                          type="email"
                          className="form-control"
                          id="pac_email"
                          name="email"
                          value={datospaciente.email}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <Button 
                        color="info"
                        type="submit"
                        >
                        Guardar
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
export default Profile;