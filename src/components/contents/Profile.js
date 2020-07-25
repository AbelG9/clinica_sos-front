import React, {useState, useEffect, useContext} from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Formulario from "./Formulario";
import Axios from 'axios';
import url from '../../config';
import {AuthContext} from '../../contexts/AuthContext';

const MySwal = withReactContent(Swal);

const Profile = () => {
    const {state} = useContext(AuthContext);
    const dataStorage = state.data.paciente_id_paciente;
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
        datospaciente.pac_document=== "" ||
        datospaciente.pac_name=== "" ||
        datospaciente.pac_lastname=== "" ||
        datospaciente.pac_address=== "" ||
        datospaciente.pac_phone=== ""
    ) {
      MySwal.fire({
        icon: "warning",
        title: "Faltan datos!",
        text: "Te falta llenar algunos campos!",
      });
        } else {
            if (
                datospaciente.pac_phone.length>9 ||
                datospaciente.pac_phone.length<9
            ) {
                MySwal.fire({
                icon: "warning",
                title: "Número incorrecto!",
                text: "Ingresa un número de teléfono correcto!",
                });
            }
            else {
                savePatient();
            }
        }
    }

    const savePatient = async () => {
        let res = await Axios.put(`${url}api/paciente/updateUserPatient`, { datospaciente });
        let response = await res.data;
        console.log(response);
        if (response.success) {
            MySwal.fire({
                icon: "success",
                title: "Actualizado!",
                text: "Datos actualizados correctamente!",
            });
        } else {
            MySwal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Algo fue mal!",
            })
        }
    }

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