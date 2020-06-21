import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../assets/styles/FormYesNo.css'

const FormYesNo = () => {
  return (
    <Form className="d-flex flex-column align-items-end border">
      <FormGroup className="text-white" tag="fieldset">
        <div>
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
            SI
          </Label>
        </FormGroup>
        <FormGroup className="d-flex flex-column align-items-end">
          <Input type="number" id="dniNumb" placeholder="Ingrese su DNI" style={{width: '50%'}} />
        </FormGroup>
      </FormGroup>
      <Button color="info">Siguiente</Button>
    </Form>
  );
}

export default FormYesNo;