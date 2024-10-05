import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; //PROTEGER RUTA--UTILIZAR_useEffect
import swal from "sweetalert2";
import avatar from "../assets/avatar.png";
import ModalupProiveedor from "../components/modals/ModalUpdateProveedor";
import ModalP from "../components/modals/modalProveedor";
import Navbar from "../components/navbar";
import SidebarCompras from "../components/sidebarCompras";
import PDFGenerator from "../generarPDF/gProveedores";
import "../styles/proveedores.css";

const Proveedor = () => {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [search, setSaerch] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [orderAsc, setOrderAsc] = useState(true); // Estado para el orden

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [usersPerPage] = useState(5); // Número de usuarios por página
  
  //const URL = import.meta.env.VITE_URL;
  const URL = "http://localhost:3000/";

  const getData = async () => {
    try {
      const response = await fetch(URL + "proveedores");
      const datos = await response.json();
      setProveedores(datos);
      console.log(datos);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  // // // // //-----CAPTURAR DATOS DE NUEVO PROVEEDOR------//
  const { handleSubmit, register } = useForm();
  const enviarProveedor = handleSubmit(async (data) => {
    
    try {
    console.log(data);
    const response = await fetch(URL + "proveedores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al insertar el usuario");
    }

    getData();
    cambiarEstadoModal1(!estadoModal1);

    swal.fire({
      title: "Proveedor Agregado!",
      icon: "success",
      showConfirmButton: false,
      timer: 1200,
      customClass: {
        confirmButton: "btEliminar",
        cancelButton: "btCancelar",
        popup: "popus-eliminado",
        title: "titulo-pop",
        container: "contenedor-alert",
      },
    });
  } catch (error) {
    console.error("Error:", error.message); // Esto imprimirá el mensaje de error en la consola
    swal.fire({
      title: "Error",
      text: error.message,
      icon: "error",
      confirmButtonText: "Ok",
    });
    }
  });

  //-----------------ELIMINAR PORVEEDOR---------------------------------

  const handleDelete = async (idprov) => {
    const res = await fetch(URL + `proveedores/${idprov}`, {
      method: "DELETE",
    });
    // const data = await res.json();
    console.log(res);
    setProveedores(
      proveedores.filter((proveedor) => proveedor.idprov !== idprov)
    );
  };

  //------------------------------------FIN ELIMINA PROVEEDOR -----------------------------------

  //---------------------ALERTAS ----------------------------------
  const mostrarAlerta = (idprov) => {
    swal
      .fire({
        title: "¿Desea eliminar?",
        icon: "question",
        text: "Se eliminaran los datos del Proveedor",
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#FF8A00",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#5E5E5E",
        buttonsStyling: false,
        showCloseButton: true,

        customClass: {
          confirmButton: "btEliminar",
          cancelButton: "btCancelar",
          popup: "popus-class",
          title: "titulo-pop",
          text: "text-pop",
          icon: "icon-pop",
          container: "contenedor-alert",
        },
      })
      .then((response) => {
        if (response.isConfirmed) {
          handleDelete(idprov);

          swal.fire({
            title: "¡Eliminado!",
            icon: "success",
            showConfirmButton: false,
            timer: 1200,
            customClass: {
              confirmButton: "btEliminar",
              cancelButton: "btCancelar",
              popup: "popus-eliminado",
              title: "titulo-pop",
              container: "contenedor-alert",
            },
          });
        }
      });
  };
  //----------------------------FIN DE ALERTAS --------------------------------

  //--------------------------------- EDITAR PROVEEDOR ----------------------------------//

  const [idEdit, setIdEdit] = useState("");

  //--------------------------------- FIN EDITAR PROVEEDOR ----------------------------------//

  //------------busqueda inteligente -----------------
  const searcher = (e) => {
    setSaerch(e.target.value);
    console.log(e.target.value);
  };
  //----metodod de filtrado de busqueda-----
  let result = [];
  if (!search) {
    result = proveedores;
  } else {
    result = proveedores.filter((datos) =>
      datos.nombre_pr.toLowerCase().includes(search.toLowerCase())
    );
  }

  const toggleOrder = () => {
    setOrderAsc(!orderAsc);
    const sortedProveedores = [...proveedores].sort((a, b) => {
      if (orderAsc) {
        return a.nombre_pr.localeCompare(b.nombre_pr); // Orden ascendente
      } else {
        return b.nombre_pr.localeCompare(a.nombre_pr); // Orden descendente
      }
    });
    setProveedores(sortedProveedores);
  };

  // Índices para la paginación
const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;
const currentUsers = result.slice(indexOfFirstUser, indexOfLastUser);

const totalPages = Math.ceil(result.length / usersPerPage);

  // Ajustar currentPage si excede totalPages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [result.length, totalPages]);

 // Ajustar a la primera página si result cambia
 useEffect(() => {
  setCurrentPage(1); // Regresar a la primera página cuando cambien los resultados
}, [result]);


    /*----Proteger Rutas---Solo se puede accesar SI ESTA LOGEADO */
    const navegate = useNavigate();

    useEffect(() => {
      // Comprobar si el token existe en el localStorage
      const token = localStorage.getItem('token');
  
      // Si no hay token, redirigir al inicio
      if (!token) {
        navegate('/Admin'); // Reemplaza '/inicio' con la ruta a la que quieres redirigir
      }
    }, []);

  return (
    <>
      <Navbar />
      <SidebarCompras />
      <div className="bodyProv">
        <div className="ContainerP"></div>
        <div className="Proveedores">
          <br></br>
          <h2>Listado de Proveedores</h2>
          <br></br>
          {/* ------------------- MODAL AGREGAR NUEVO PROVEEDOR-------------- */}
          <ModalP
            estado={estadoModal1}
            cambiarEstado={cambiarEstadoModal1}
            titulo="Nuevo proveedor"
          >
            <div className="containerNewProv">
              <form
                className="nuevoProvForm"
                id="FormularioP"
                onSubmit={enviarProveedor}
              >
                <div className="itemProv">
                  <label>NIT: </label>
                  <input
                    {...register("nit_pr")}
                    type="number"
                    id="nit_pr"
                    placeholder="NIT"
                  ></input>
                </div>

                <div className="itemProv">
                  <label>Proveedor: </label>
                  <input
                    {...register("nombre_pr")}
                    type="text"
                    id="nombre_pr"
                    placeholder="Proveedor"
                  ></input>
                </div>

                <div className="itemProv">
                  <label>Telefono: </label>
                  <input
                    {...register("telefono_pr")}
                    type="number"
                    id="telefono_pr"
                    placeholder="Telefono"
                  ></input>
                </div>

                <div className="itemProv">
                  <label>Correo: </label>
                  <input
                    {...register("correo_pr")}
                    type="text"
                    id="correo_pr"
                    placeholder="Correo electronico"
                  ></input>

                  <div className="itemProv">
                    <label>Direccion: </label>
                    <input
                      {...register("direccion_pr")}
                      type="text"
                      id="direccion_pr"
                      placeholder="Direccion"
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
          </ModalP>
          {/* --------------------------- FIN MODAL INGRESAR NUEVO PROVEEDOR ------------------ */}

          {/* ------------------- MODAL EDITAR  PROVEEDOR-------------- */}

          <ModalupProiveedor
            estado2={estadoModal2}
            cambiarEstado2={cambiarEstadoModal2}
            titulo2={"Actualizar proveedor"}
            idEdit={idEdit}
            setProveedores={setProveedores}
            proveedores={proveedores}
          ></ModalupProiveedor>
          {/* --------------------------- FIN MODAL EDITAR PROVEEDOR ------------------ */}

          {/* //----------------------------------ELIMINAR PROVEEDOR ----------------------------------*/}

          <div className="centrarControles">
            <div className="controlesUsuario">
              <button onClick={() => cambiarEstadoModal1(!estadoModal1)}>
                <span className="material-symbols-outlined">person_add</span>
              </button>

              <div className="busqueda">
                <form method="get" className="cuadroBusqueda">
                  <input
                    type="text"
                    value={search}
                    onChange={searcher}
                    placeholder="Buscar proveedor"
                    name="q"
                  ></input>
                  <button type="submit">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </form>
              </div>

              <button onClick={toggleOrder}>
                 <span className="material-symbols-outlined">
                  {orderAsc ? "arrow_upward" : "arrow_downward"}
                 </span>
              </button>

              <PDFGenerator data={proveedores} />

              <button onClick={getData}>
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>
          </div>
          <hr></hr>
          <br></br>

          {/* //----------------VERSION MOVIL ------------------------------ */}
          <div className="proveedorMovil">
            {currentUsers.map((proveedores, index) => (
              <div className="ContenedorProveedores" key={index}>
                <div className="imgPerfil">
                  <div className="proveedorID">
                    <p>ID</p>
                    <span>{proveedores.idprov}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(proveedores.idprov)
                    }
                  />
                </div>

                <div
                  className="datoProveedor"
                  onClick={() =>
                    cambiarEstadoModal2(!estadoModal2) &
                    setIdEdit(proveedores.idprov)
                  }
                >
                  <div>
                    <h3>{proveedores.nombre_pr}</h3>
                  </div>
                  <div>
                    <h5>NIT: {proveedores.nit_pr}</h5>
                  </div>
                  <div>
                    <p>Telefono: {proveedores.telefono_pr}</p>
                  </div>
                </div>
                <div className="controlBtP">
                  <button className="btEditarU">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(proveedores.idprov)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* //--------------------------- FIN VERSION MOVIL ---------------------------- */}
          <div className="proveedorEscritorio">
            <div className="encabezadoEscritorio">
              <div className="encID">
                <div>
                  <h3>ID: </h3>
                </div>
              </div>

              <div className="encDato">
                <div className="encD">
                  <h3>Proveedor: </h3>
                </div>
                <div className="encD">
                  <h3>NIT: </h3>
                </div>
                <div className="encD">
                  <h3>Telefono: </h3>
                </div>
                <div className="encD">
                  <h3>Correo: </h3>
                </div>
                <div className="encD">
                  <h3>Direccion: </h3>
                </div>
              </div>
              <div className="encBT">
                <div>
                  <h3>Accion: </h3>
                </div>
              </div>
            </div>

            {currentUsers.map((proveedor, index) => (
              <div className="ContenedorProveedores" key={index}>
                <div className="imgPerfil">
                  <div className="proveedorID">
                    <p>ID</p>
                    <span>{proveedor.idprov}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                  />
                </div>

                <form
                  className="datoProveedor"
                  // onClick={() => cambiarEstadoModal2(!estadoModal2)}
                >
                  <div>
                    <h3>{proveedor.nombre_pr}</h3>
                  </div>
                  <div>
                    <h5>{proveedor.nit_pr}</h5>
                  </div>
                  <div>
                    <p>{proveedor.telefono_pr}</p>
                  </div>
                  <div>
                    <p>{proveedor.correo_pr}</p>
                  </div>
                  <div>
                    <p>{proveedor.direccion_pr}</p>
                  </div>
                </form>
                <div className="controlBtP">
                  <button
                    className="btEditarU"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(proveedor.idprov)
                    }
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(proveedor.idprov)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Paginated navigation */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Proveedor;
