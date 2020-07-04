import React, {Fragment} from 'react';
import { Button, FormGroup, Input } from 'reactstrap';
import '../assets/styles/FormYesNo.css'

const FormYesNo = ({ onSubmit, onChange, dataDni }) => {
  return (
      <Fragment>
        <form onSubmit={onSubmit} className="d-flex flex-column align-items-end mr-3">
          <FormGroup className="text-white" tag="fieldset">
            <div className="title-custom-form custom-font">
              <h2 className="text-white text-right">Antes de empezar,</h2>
              <h2 className="text-white text-right">ingrese su DNI</h2>
            </div>
            <FormGroup className="d-flex flex-column align-items-end custom-font">
              <Input className=" text-right" type="number" onChange={onChange} value={dataDni} name="dninumber" placeholder="Ingrese su DNI" />
            </FormGroup>
          </FormGroup>
          <div className="btn-custom-right custom-font">
            <Button color="info" className="btn-lg">Siguiente</Button>
          </div>
        </form>
      </Fragment>
  );
}

export default FormYesNo;
