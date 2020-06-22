import React from 'react';
import {FormGroup, Input, Label} from "reactstrap";

const OptionQuestion = ({question, showButton, subPage, setSubPage}) => {
    if (question) {
        return (
            <div className="pt-5">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="d-flex flex-row">
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
                        showButton ? <button className="btn btn-primary mt-5 mt-md-2" onClick={() => setSubPage(subPage+1)}>Next</button> : null
                    }
                </form>
            </div>
        )
    } else {
        return (
            <div className="pt-5">
                MOSTAR ALGO!
            </div>
        )
    }
};

export default OptionQuestion;
