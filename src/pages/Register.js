import React from 'react';
import NavPac from './Partials/Navbar';
import FormPacient from './Partials/FormPacient';

const RegisterData = ({dataDni, setPage, setStateOption, stateOption}) => { //aqui estoy recibiendo la variable del coponente Home
    return (
        <div>
            <NavPac />
            <FormPacient
                setStateOption={setStateOption}
                stateOption={stateOption}
                setPage={setPage} //aqui envio la variable que recibí al componente Form
                dataDni={dataDni}
            />
        </div>   
    );
}

export default RegisterData;