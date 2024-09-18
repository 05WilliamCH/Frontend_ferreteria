import React from "react";
import "../../styles/proveedores.css";
const newProveedor = () => {
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

export default newProveedor;
