import React from 'react';
import '../assets/styles/ToogleSwitch.css'

const ToggleSwitch = ({name, stateOption, setStateOption, option}) => {

    return (
        <div className="d-flex flex-row custom-font">
            <label className="toggle-radio ml-4 ml-sm-5 ml-md-5 ml-lg-5">
                <input type="radio" name={name} value="yes"  id="yes" checked={stateOption === 'yes'} onChange={setStateOption} />
                <span className="checkmark"></span>
                {option ? 'Positivo' : 'Si' }
            </label>
            <label className="toggle-radio ml-4 ml-sm-5 ml-md-5 ml-lg-5">
                <input type="radio" name={name} value="no" id="no"  checked={stateOption === 'no'} onChange={setStateOption}/>
                <span className="checkmark"></span>
                {option ? 'Negativo' : 'No' }
            </label>
        </div>

    );
};

export default ToggleSwitch;
