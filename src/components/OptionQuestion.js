import React, {useState} from 'react';
import {FormGroup, Input, Label, Button} from "reactstrap";
import { Link } from 'react-router-dom';


const OptionQuestion = ({question, showButton, subPage, setSubPage}) => {
    if (question) {
        return (
            <div className="pt-2">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="d-flex flex-column">
                        <p>{question} &nbsp;&nbsp;</p>
                        <div className="form-group">
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio1" checked/>
                                    SI
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio1" />
                                    NO
                                </Label>
                            </FormGroup>
                        </div>
                    </div>
                    {
                        showButton ? 
                        <div className="pt-2">
                            <button className="btn btn-info mt-5 mt-md-2" onClick={() => setSubPage(subPage+1)}>Siguiente</button>
                        </div>
                         : null
                    }
                </form>
            </div>
        )
    } else {
        return (
            <div className="pt-5">
                <FormGroup tag="fieldset">
                    <div className="title-custom-form">
                        <h2 className="text-black text-right">El triaje ha terminado</h2>
                    </div>
                    <div className="d-flex justify-content-end">
                        {/* <Button color="info" className="btn-lg">Ir a mi perfil</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}

                        {/* <Link to="/" className="btn btn-secondary btn-lg">Salir</Link> */}
                        <Button color="secondary" className="btn-lg" href="/">Salir</Button>
                    </div>
                </FormGroup>
            </div>
        )
    }
};

export default OptionQuestion;
