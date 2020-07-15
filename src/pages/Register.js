import React from 'react';
import NavPac from './Partials/Navbar';
import FormPacient from './Partials/FormPacient';

const RegisterData = ({dataDni, setPage, setStateOption, stateOption}) => { 
    return (
        <div>
            <NavPac />
            <FormPacient
                setStateOption={setStateOption}
                stateOption={stateOption}
                setPage={setPage}
                dataDni={dataDni}
            />
        </div>   
    );
}

export default RegisterData;