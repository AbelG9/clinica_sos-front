import React from "react";
import "../assets/styles/Loader.css";

const Loader = () => {
  return (
    <div className="body">
      <div class="wrapper-loading">
        <div class="circle-loading"></div>
        <div class="circle-loading"></div>
        <div class="circle-loading"></div>
        <div class="shadow-loading"></div>
        <div class="shadow-loading"></div>
        <div class="shadow-loading"></div>
        <span>Cargando</span>
      </div>
    </div>
  );
};

export default Loader;
