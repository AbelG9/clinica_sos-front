import React, {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Formulario from "./Formulario";

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
        <div className="d-flex justify-content-center">
          <div className="card" style={{ width: '50rem' }}>
          <div className="card-body">
            <Formulario 
              datospaciente={datospaciente}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              disabled={disabled}
            />
          </div>
          </div>
        </div>
    );  
}
export default Profile;