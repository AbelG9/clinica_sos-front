import React from "react";
import "../assets/styles/Loader.css";

const Loader = () => {
  return (
    <div className="body">
      <div className="wrapper-loading">
        <div className="circle-loading"></div>
        <div className="circle-loading"></div>
        <div className="circle-loading"></div>
        <div className="shadow-loading"></div>
        <div className="shadow-loading"></div>
        <div className="shadow-loading"></div>
        <span>Cargando</span>
      </div>
    </div>
  );
};

export default Loader;
