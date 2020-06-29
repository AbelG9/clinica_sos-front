import React from 'react';
import {FormGroup, Input, Label, Button} from "reactstrap";

const TextQuestion = ({question, showButton, subPage, setSubPage}) => {
    if (question) {
        return (
            <div className="pt-2">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="d-flex flex-column">
                        <p>{question} &nbsp;&nbsp;</p>
                        <div className="form-group">
                            <Input type="text" className="form-control" required="required" autoComplete="off" />

                            {/* <FormGroup check>
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
                            </FormGroup> */}
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
    }
}

export default TextQuestion;