import React from "react";
import Navbar from "../components/navbar";
import "../styles/inicio.css";

//import styled from 'styled-components';
//import Modal from './componentes/modal';
import { useForm } from "react-hook-form";
function Inicio() {
  const { handleSubmit, register } = useForm();
  const enviarInicio = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <>
      <Navbar />

      <body className="grid-container">
        <section className="main">
          <article className="contenido">
            <div className="reportes">
              <h1>Panel</h1>
              <br />
            </div>
            <br></br>
            <button type="button" className="butonReport">
              Ver completo
            </button>
          </article>
        </section>
      </body>
    </>
  );
}

export default Inicio;
