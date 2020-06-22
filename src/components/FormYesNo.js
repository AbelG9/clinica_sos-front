import React, {Fragment} from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import '../assets/styles/FormYesNo.css'

const FormYesNo = ({ onSubmit, onChange, dataDni }) => {
  return (
      <Fragment>
        <form onSubmit={onSubmit} className="d-flex flex-column align-items-end mr-5">
          <FormGroup className="text-white" tag="fieldset">
            <div className="title-custom-form">
              <h2 className="text-white text-right">Antes de empezar,</h2>
              <h2 className="text-white text-right">verifica que no sea una emergencia</h2>
            </div>
            <FormGroup check className="d-flex flex-column align-items-end">
              <Label check>
                <Input type="radio" name="radio1" checked/>
                NO
              </Label>
            </FormGroup>
            <FormGroup check className="d-flex flex-column align-items-end">
              <Label check>
                <Input type="radio" name="radio1" />
                SI &nbsp;
              </Label>
            </FormGroup>
            <FormGroup className="d-flex flex-column align-items-end">
              <Input type="number" onChange={onChange} value={dataDni} name="dninumber" placeholder="Ingrese su DNI" style={{width: '50%'}} />
            </FormGroup>
          </FormGroup>
          <div className="btn-custom-right">
            <Button color="info">Siguiente</Button>
          </div>
        </form>
      </Fragment>
  );
}

export default FormYesNo;
