import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sidebarCompras.css";

//import styled from 'styled-components';
//import Modal from './componentes/modal';

function SidebarCompras() {
  const navegate = useNavigate();
  return (
    <>
      <div className="ContenedorSBC">
        <nav className="sidebar">
          <button
            className="BTcompras"
            onClick={() => navegate("/Admin/Compras")}
          >
            <div>
              <h3>Compras</h3>
            </div>
          </button>

          <button
            className="BTproveedores"
            onClick={() => navegate("/Proveedor")}
          >
            <div>
              <h3>Proveedores</h3>
              {/* <a href="#">Proveeedores</a> */}
            </div>
          </button>

          <button
            className="BTdevoluciones"
            onClick={() => navegate("/Categoria")}
          >
            <div>
              <h3>Categoria</h3>
            </div>
          </button>
        </nav>
      </div>
    </>
  );
}

export default SidebarCompras;
