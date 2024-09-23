import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, } from "react-router-dom";

import ModalCategoria from '../src/components/modals/modalCategoria';
import ModalP from "../src/components/modals/modalProveedor";
import Categoria from "./pages/Categoria";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Proveedor from "./pages/Proveedor";
import Usuario from "./pages/Usuario";


function App() {
  //const [count, setCount] = useState(0)
    /* Lógica de autenticación de Usuario */
    const [isAuthenticated, setIsAuthenticated] = useState(true);//Cambiar false
    const setAuth = (booleand) => {
      setIsAuthenticated(booleand);
    };
  
    async function isAuth() {
      try {
        const response = await fetch(URL + "auth/verify", {
          method: "GET",
          headers: { token: localStorage.token },
        });
  
        const parseRes = await response.json();
        parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      } catch (err) {
        console.error(err.message);
      }
    }
  
    useEffect(() => {
      isAuth();
    });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/Usuario" element={<Usuario />} />
          <Route path="/Proveedor" element={<Proveedor />} />
          <Route path="/Categoria" element={<Categoria />} />
          <Route path="/Usuario/:id_usuario/editar" element={<Usuario />} />
          <Route path="/Proveedor/:idprov/editar" element={<ModalP />} />
          <Route path="/Categoria/:idcategoria/editar" element={<ModalCategoria />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
