import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Ferreteria El Manatial.jpg";
import "../styles/navbar.css";

//import styled from 'styled-components';
//import Modal from './componentes/modal';
import { useForm } from "react-hook-form";
function Navbar() {
  const { handleSubmit, register } = useForm();
  const enviarInicio = handleSubmit((data) => {
    console.log(data);
  });

  const navegate = useNavigate();

  return (
    <>
      <header className="header">
        <h2>FERRETERIA EL MANANTIAL</h2>

        <div className="logoPI">
          <img
            src={logo}
            className="logoLogin"
            onClick={() => navegate("/Inicio")}
          />
        </div>
      </header>

      <nav className="navbarUMG">
        <button type="button" className="navB">
          <div className="Reportes">
            <span className="material-symbols-outlined">bar_chart</span>
            <span>Panel</span>
          </div>
        </button>

        <button 
         type="button" 
         className="navB"
         onClick={() => navegate("/Usuario")}
          >
          <div className="Pedidos">
            <span className="material-symbols-outlined">settings</span>
            <span>Administracion</span>
          </div>
        </button>

        <button
          type="button"
          className="navB"
          onClick={() => navegate("/Proveedor")}
        >
          <div className="Administrar">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span>Compra</span>
          </div>
        </button>

        <button type="button" className="navB">
          <div className="Inventario">
            <span className="material-symbols-outlined">package_2</span>
            <span>Inventario</span>
          </div>
        </button>

        <button
          type="button"
          className="navB"
          onClick={() => navegate("/Proveedor")}
        >
          <div className="Inventario">
            <span className="material-symbols-outlined">point_of_sale</span>
            <span>Venta</span>
          </div>
        </button>

        <button
          type="button"
          className="navB"
          onClick={() => navegate("/Proveedor")}
        >
          <div className="Inventario">
            <span className="material-symbols-outlined">assessment</span>
            <span>Reportes</span>
          </div>
        </button>

      </nav>
    </>
  );
}

export default Navbar;
