import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../components/modals/modalProveedor";
import Navbar from "../components/navbar";
import "../styles/proveedores.css";

const Proveedor = () => {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);

  const [proveedor, setProveedor] = useState([]);

  const URL = "https://8086zfpm-3000.use.devtunnels.ms/proveedores";

  const getData = async () => {
    try {
      const response = await fetch(URL);
      const json = await response.json();
      setProveedor(json);
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // // // // //-----CAPTURAR DATOS DE NUEVO PROVEEDOR------//
  const { handleSubmit, register } = useForm();
  const enviarProveedor = handleSubmit((data) => {
    console.log(data);
    fetch("http://localhost:3000/proveedores", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  });

  const handleDelete = async (idprov) => {
    const res = await fetch(`http://localhost:3000/proveedores/${idprov}`, {
      method: "DELETE",
    });
    // const data = await res.json();
    console.log(res);
    setProveedor(proveedor.filter((proveedor) => proveedor.idprov !== idprov));
  };

  return (
    <>
      <Navbar />
      <div className="bodyProv">
        <div className="ContainerP"></div>
        <div className="Proveedores">
          <br></br>
          <h2>Listado de Proveedores</h2>
          <br></br>
          {/* ------------------- MODAL AGREGAR NUEVO PROVEEDOR-------------- */}
          <Modal estado={estadoModal1} cambiarEstado={cambiarEstadoModal1}>
            <div className="containerNewProv">
              <form className="nuevoProvForm" onSubmit={enviarProveedor}>
                <div className="itemProv">
                  <label>Codigo: </label>
                  <input
                    {...register("nit")}
                    type="number"
                    id="nit"
                    placeholder="NIT"
                  ></input>
                </div>

                <div className="itemProv">
                  <label>Proveedor: </label>
                  <input
                    {...register("proveedor")}
                    type="text"
                    id="nombreProv"
                    placeholder="Proveedor"
                  ></input>
                </div>

                <div className="itemProv">
                  <label>Telefono: </label>
                  <input
                    {...register("telefono")}
                    type="number"
                    id="telefonoProv"
                    placeholder="Telefono"
                  ></input>
                </div>

                <div className="itemProv">
                  <label>Correo: </label>
                  <input
                    {...register("email")}
                    type="text"
                    id="emailProv"
                    placeholder="Correo electronico"
                  ></input>

                  <div className="itemProv">
                    <label>Direccion: </label>
                    <input
                      {...register("direccion")}
                      type="text"
                      id="emailUser"
                      placeholder="direccion"
                    ></input>
                  </div>
                </div>
                <br />

                <div className="bonotesNewProv">
                  <div>
                    <button
                      type="button"
                      onClick={() => cambiarEstadoModal1(!estadoModal1)}
                      className="btcancelar"
                    >
                      Cancelar
                    </button>
                  </div>
                  <div>
                    <button type="submit" className="btGuardar">
                      Guardar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
          {/* --------------------------- FIN MODAL INGRESAR NUEVO PROVEEDOR ------------------ */}
          {/* //----------------------------------ELIMINAR PROVEEDOR ----------------------------------*/}

          <div className="controlesProveedor">
            <button onClick={() => cambiarEstadoModal1(!estadoModal1)}>
              <span className="material-symbols-outlined">person_add</span>
            </button>

            <div className="busqueda">
              <form
                action="http://localhost:3000/proveedor"
                method="get"
                className="cuadroBusqueda"
              >
                <input
                  type="text"
                  placeholder="Buscar proveedor"
                  name="q"
                ></input>
                <button type="submit">
                  <span className="material-symbols-outlined">search</span>
                </button>
              </form>
            </div>

            <button>
              <span className="material-symbols-outlined">print</span>
            </button>
            <button>
              <span className="material-symbols-outlined">calendar_month</span>
            </button>
          </div>
          <hr></hr>
          <table className="tablaRes">
            <thead>
              <tr>
                <th>ID</th>
                <th>Proveedor</th>
                <th>Nit</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Direccion</th>
                <th>Accion</th>
                {/* <th scope="col">Correo</th> */}
              </tr>
            </thead>
            <tbody className="fila">
              {proveedor.map((proveedor, index) => (
                <tr key={index}>
                  <td>{proveedor.idprov}</td>
                  <td>{proveedor.proveedor}</td>
                  <td>{proveedor.nit}</td>
                  <td>{proveedor.telefono}</td>
                  <td>{proveedor.email}</td>
                  <td>{proveedor.direccion}</td>
                  {/* <td>{usuario.telefono}</td>
                <td>{usuario.email}</td> */}
                  <td>
                    <button className="btEditar">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button
                      className="btEditar"
                      onClick={() => handleDelete(proveedor.idprov)}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Proveedor;
