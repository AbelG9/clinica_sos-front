import React from 'react';

const OptionQuestion = ({ question }) => {
    return (
        <div className="d-flex flex-row font-weight-bold custom-font">
            <p>{question} &nbsp;&nbsp;</p>
        </div>
    )
};

export default OptionQuestion;
