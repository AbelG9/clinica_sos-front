import React from 'react';
import { Label, Input, Button } from "reactstrap";

const Formulario = ({ handleSubmit, handleChange, datospaciente}) => {
  return (
    <form onSubmit={handleSubmit} className="text-left" id="form_patient">
      <div className="form-row">
        <div className="form-group col-md-6">
          <Label for="pac_document">DNI</Label>
          <Input
            type="number"
            className="form-control"
            id="pac_document"
            name="dni"
            value={datospaciente.dni}
            onChange={handleChange}
            disabled={false}
            required
            autoComplete="off"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <Label for="pac_name">Nombres</Label>
          <Input
            type="text"
            className="form-control"
            id="pac_name"
            name="nombres"
            value={datospaciente.nombres}
            onChange={handleChange}
            disabled={false}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group col-md-6">
          <Label for="pac_lastname">Apellidos</Label>
          <Input
            type="text"
            className="form-control"
            id="pac_lastname"
            name="apellidos"
            value={datospaciente.apellidos}
            onChange={handleChange}
            disabled={false}
            required
            autoComplete="off"
          />
        </div>
      </div>
      <div className="form-group">
        <Label for="pac_address">Dirección</Label>
        <textarea
          className="form-control"
          id="pac_address"
          name="direccion"
          value={datospaciente.direccion}
          onChange={handleChange}
          required
          autoComplete="off"
        ></textarea>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <Label for="pac_fech_nac">Fecha Nacimiento</Label>
          <Input
            type="date"
            className="form-control"
            id="pac_fech_nac"
            name="fechanac"
            value={datospaciente.fechanac}
            onChange={handleChange}
            autoComplete="off"  
          />
        </div>
        <div className="form-group col-md-6">
          <Label for="pac_sex">Sexo</Label>
          <select
            className="form-control"
            id="pac_sex"
            name="sexo"
            required
            onChange={handleChange}
          >
            <option value="">Seleccione...</option>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMENINO">Femenino</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-3">
          <Label for="pac_phone">Telefono</Label>
          <Input
            type="number"
            className="form-control"
            id="pac_phone"
            name="telefono"
            value={datospaciente.telefono}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group col-md-9">
          <Label for="pac_email">Correo</Label>
          <Input
            type="email"
            className="form-control"
            id="pac_email"
            name="email"
            value={datospaciente.email}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="modal-footer">
        <Button 
          color="info"
          type="submit"
          >
          Actualizar
        </Button>
      </div>
    </form>
  )
}

export default Formulario;