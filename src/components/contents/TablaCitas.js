import React, { useState, useEffect } from 'react';
import { Collapse, Button, CardBody, Card, Table} from 'reactstrap';
import url from "../../config";
import Axios from "axios";
import LoarderCircle from "../LoaderCircle";
import Paginator from "./Paginator";

const TableCita = ({dataStorage}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [page, setPage] = useState(1);

  const [citaspatient, setCitaspatient] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagedata, setPagedata] = useState(
      {
          cantItems: 0,
          pageSize: 10,
          cantpages: 1,
          current_page: 1,
      }
  )

  const loadcitapatient = async () => {
      setLoading(true);
    try {   
      let rescitapatient = await Axios.post(`${url}citas/getCitasByPatient?page=${page}`, { dataStorage, pagedata });
      let responsecitas = await rescitapatient.data;
      console.log(responsecitas);
      if (responsecitas.data.length > 0) {
        setCitaspatient(responsecitas.data);
        setPagedata({
            ...pagedata,
            cantItems: responsecitas.total,
            cantpages: responsecitas.last_page,
            current_page: responsecitas.current_page
          });
        setLoading(false);
      }
    } catch (error) {
        setLoading(false);
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
        {
        loading ? <LoarderCircle /> :
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
            <div className="col d-flex justify-content-center">
                <Paginator
                    pagedata={pagedata}
                    setPagedata={setPagedata}
                    loadcitapatient={loadcitapatient}
                    page={page}
                    setPage={setPage}
                />
            </div>
          </CardBody>
        }
        </Card>
      </Collapse>
    </div>
  );
}

export default TableCita;