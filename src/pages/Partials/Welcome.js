import React, { useEffect, useState } from "react";
import { Label, Input, Button } from "reactstrap";
import Axios from "axios"
import url from "../../config";
import Background from "../../assets/img/background.svg";
import "../../assets/styles/WelcomePac.css";

const WelcomePac = ({dataDni, setPage}) => {
    let nombre

    return (
        <div>
            <div
                style={{
                background: `url(${Background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 70%",
                padding: "2px",
                height: "66vh",
                }}
            ></div>
            <div className="title-custom-form custom-font">
                <div className="Welcome-Preset">
                  <h2 className="text-white text-right">Bienvenido</h2>
                  <h2 className="text-white text-right">...</h2>
                  <h2 className="text-white text-right">Este es tu lugar!</h2>
                </div>
            </div>
        </div>
    );
}
export default WelcomePac
