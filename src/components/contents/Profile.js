import React, {useState} from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Formulario from "./Formulario";

const MySwal = withReactContent(Swal);

const Profile = () => {
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

    return (
        <div className="m-3">
          <div className="card">
            <div className="card-body">
                <Formulario 
                    datospaciente={datospaciente}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
            </div>
          </div>
        </div>
    );  
}
export default Profile;