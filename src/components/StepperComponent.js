import React, {Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';

const StepperComponent = ({setSubPage, subPage}) => {
    return (
        <div>
            <div className="stepper-position">
                <div className="bs-stepper-header">
            {
                [1, 2, 3].map((number, index) => {
                    return (
                        <Fragment key={index}>
                            <div className={`step ${subPage === number ? 'active' : ''}`}>
                                <button  className="step-trigger" onClick={() => setSubPage(number)}>
                                    <span className="bs-stepper-circle">{number}</span>
                                </button>
                            </div>
                            {
                                number === 3 ? null : <div className="line"></div>
                            }
                        </Fragment>
                    )
                })
            }
                </div>
            </div>
        </div>
    )
};

export default StepperComponent;
