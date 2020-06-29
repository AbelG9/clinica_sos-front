import React, {Fragment} from 'react';
import { Button, FormGroup, Input } from 'reactstrap';
import '../assets/styles/FormYesNo.css'

const FormYesNo = ({ onSubmit, onChange, dataDni }) => {
  return (
      <Fragment>
        <form onSubmit={onSubmit} className="d-flex flex-column align-items-end mr-5">
          <FormGroup className="text-white" tag="fieldset">
            <div className="title-custom-form">
              <h1 className="text-white text-right">Antes de empezar,</h1>
              <h1 className="text-white text-right">ingrese su DNI</h1>
            </div>
            {/* <FormGroup check className="d-flex flex-column align-items-end">
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
            </FormGroup> */}
            <FormGroup className="mt-4 d-flex flex-column align-items-end">
              <Input type="number" maxLength="8" onChange={onChange} value={dataDni} name="dninumber" placeholder="DNI" style={{width: '70%'}} />
            </FormGroup>
          </FormGroup>
          <div className="btn-custom-right">
            <Button color="info" className="btn-lg">Siguiente</Button>
          </div>
        </form>
      </Fragment>
  );
}

export default FormYesNo;
