import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Ferreteria El Manatial.jpg";
import "../styles/login.css";



//import '../assets/styles/Login.css';
const Login = ({ setAuth }) => {
 // const sidebar = useSidebarContext()
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate()

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      console.log(body)
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      console.log(parseRes)
      if (parseRes.token){
        console.log(parseRes.token)
        localStorage.setItem("token", parseRes.token);
        //setAuth(true)
        navigate("/Inicio")
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
   <div className="bodyLogin">
      <div className="login-box">
      <img src={logo} className="logoLogin" />
          <h1></h1>
          <br></br>
        <form onSubmit={onSubmitForm}>
        <label htmlFor="username"></label>
            <input className="input1"
            placeholder="correo"
              type="email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            ></input>
            <label htmlFor="password"></label>

            <input className="input1"
            placeholder="contraseña"
              type="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
            ></input>
            {/* <label>Contraseña</label> */}

          <div className="botones">
            <button className="BTenviar" id="btn-login">Iniciar sesion</button>
          </div>
          <h1>FERRETERIA EL MANANTIAL</h1>
        </form>
      </div>
    </div>
  );
};

export default Login;