import React, {useState, useEffect} from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Formulario from "./Formulario";
import Axios from 'axios';
import url from '../../config';

const MySwal = withReactContent(Swal);

const Profile = () => {
    const dataStorage = JSON.parse(localStorage.getItem('data')).paciente_id_paciente || '';
    const [datospaciente, setDatospaciente] = useState(
        {
            id_paciente: dataStorage,
            pac_document: '',
            pac_name: '',
            pac_lastname: '',
            pac_address: '',
            pac_fech_nac: '',
            pac_sex: '',
            pac_phone: '',
            pac_email: ''
        }
    );

    useEffect(() => {
        getDataPatient();
    }, []);

    const getDataPatient = async () => {
        let res = await Axios.post(`${url}api/paciente/getdataUserPatient`, { datospaciente });
        let response = await res.data;
        setDatospaciente(response.datapatient[0]);
    }

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