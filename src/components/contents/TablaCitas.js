import React, { useState, useEffect } from 'react';
import { Collapse, Button, CardBody, Card, Table } from 'reactstrap';
import url from "../../config";
import Axios from "axios";

const TableCita = ({dataStorage}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [citaspatient, setCitaspatient] = useState([]);

  const loadcitapatient = async () => {
    try {
      let rescitapatient = await Axios.post(`${url}api/citas/getCitasByPatient`, { dataStorage });
      let responsecitas = await rescitapatient.data;
      if (responsecitas.length > 0) {
        setCitaspatient(responsecitas);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    loadcitapatient();
  }, []);

  const renderCitas = (citaspatient, index) => {
      return (
          <tr key={index}>
            <td>{index+1}</td>
            <td>{citaspatient.cme_fech_inicial.slice(0,10)}</td>
            <td>{citaspatient.cme_fech_inicial.slice(11,19)}</td>
            <td>{citaspatient.cme_titulo}</td>
            <td>{citaspatient.cme_estado}</td>
          </tr>
      )
  }
  return (
    <div>
      <Button color="info" onClick={toggle} style={{ marginBottom: '1rem' }}>VER MI LISTADO DE CITAS</Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <Table striped hover responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Motivo</th>
                    <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {citaspatient.map(renderCitas)}
                </tbody>
            </Table>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

export default TableCita;