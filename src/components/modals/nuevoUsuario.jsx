import React, { useState, useEffect } from "react";
import "../../styles/usuarios.css";
const newUsuario = () => {
  return (
    <>
      <div>
        <form>
          <label>Nombre</label>
          <input type="text" id="nombreUser" placeholder="Nombre"></input>
        </form>
      </div>
    </>
  );
};

export default newUsuario;
