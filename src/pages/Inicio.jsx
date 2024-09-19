import React from "react";
//import Navbar from "../components/navbar";
//import "../styles/inicio.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/Sidebar';

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
      <Sidebar />

      
    </>
  );
}

export default Inicio;
