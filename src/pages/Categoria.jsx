import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; //PROTEGER RUTA--UTILIZAR_useEffect
import swal from "sweetalert2";
import avatar from "../assets/avatar.png";
import ModalupCategoria from "../components/modals/ModalUpdateCategoria";
import ModalCategoria from "../components/modals/modalCategoria";
import Navbar from "../components/navbar";
import SidebarCompras from "../components/sidebarCompras";
import PDFGenerator from "../generarPDF/gCategorias";
import "../styles/proveedores.css";

const Categoria = () => {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [search, setSaerch] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [orderAsc, setOrderAsc] = useState(true); // Estado para el orden

  //const URL = import.meta.env.VITE_URL;
  const URL = "http://localhost:3000/";

  const getData = async () => {
    try {
      const response = await fetch(URL + "categoria");
      const datos = await response.json();
      setCategorias(datos);
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
  const enviarCategoria = handleSubmit((data) => {
    console.log(data);
    fetch(URL + "categoria", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    cambiarEstadoModal1(!estadoModal1);
    swal.fire({
      title: "Categoria Agregado!",
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
    getData();
    // (document.getElementById("email").value = null),
    //   (document.getElementById("nit").value = null),
    //   (document.getElementById("nombre_proveedor").value = null),
    //   (document.getElementById("telefono_prov").value = null),
    //   (document.getElementById("direccion_prov").value = null);
  });

  //-----------------ELIMINAR PORVEEDOR---------------------------------

  const handleDelete = async (idcategoria) => {
    const res = await fetch(URL + `categoria/${idcategoria}`, {
      method: "DELETE",
    });
    // const data = await res.json();
    console.log(res);
    setCategorias(
      categorias.filter((categoria) => categoria.idcategoria !== idcategoria)
    );
  };

  //------------------------------------FIN ELIMINA PROVEEDOR -----------------------------------

  //---------------------ALERTAS ----------------------------------
  const mostrarAlerta = (idcategoria) => {
    swal
      .fire({
        title: "¿Desea eliminar?",
        icon: "question",
        text: "Se eliminaran los datos de la categoria",
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
          handleDelete(idcategoria);

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
    result = categorias;
  } else {
    result = categorias.filter((datos) =>
      datos.categoria.toLowerCase().includes(search.toLowerCase())
    );
  }

  const toggleOrder = () => {
    setOrderAsc(!orderAsc);
    const sortedCategorias = [...categorias].sort((a, b) => {
      if (orderAsc) {
        return a.categoria.localeCompare(b.categoria); // Orden ascendente
      } else {
        return b.categoria.localeCompare(a.categoria); // Orden descendente
      }
    });
    setCategorias(sortedCategorias);
  };

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
          <h2>Listado de Categorias</h2>
          <br></br>
          {/* ------------------- MODAL AGREGAR NUEVO PROVEEDOR-------------- */}
          <ModalCategoria
            estado={estadoModal1}
            cambiarEstado={cambiarEstadoModal1}
            titulo="Nueva categoria"
          >
            <div className="containerNewProv">
              <form
                className="nuevoProvForm"
                id="FormularioP"
                onSubmit={enviarCategoria}
              >
                <div className="itemProv">
                  <label>Categoria: </label>
                  <input
                    {...register("categoria")}
                    type="text"
                    id="categoria"
                    placeholder="Categoria"
                  ></input>
                </div>

                {/* <div className="itemProv">
                  <label>Proveedor: </label>
                  <input
                    {...register("nombre_proveedor")}
                    type="text"
                    id="nombre_proveedor"
                    placeholder="Proveedor"
                  ></input>
                </div>

                <div className="itemProv">
                  <label>Telefono: </label>
                  <input
                    {...register("telefono_prov")}
                    type="number"
                    id="telefono_prov"
                    placeholder="Telefono"
                  ></input>
                </div>

                <div className="itemProv">
                  <label>Correo: </label>
                  <input
                    {...register("email")}
                    type="text"
                    id="email"
                    placeholder="Correo electronico"
                  ></input>

                  <div className="itemProv">
                    <label>Direccion: </label>
                    <input
                      {...register("direccion_prov")}
                      type="text"
                      id="direccion_prov"
                      placeholder="Direccion"
                    ></input>
                  </div>
                </div> */}
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
          </ModalCategoria>
          {/* --------------------------- FIN MODAL INGRESAR NUEVO PROVEEDOR ------------------ */}

          {/* ------------------- MODAL EDITAR  PROVEEDOR-------------- */}

          <ModalupCategoria
            estado2={estadoModal2}
            cambiarEstado2={cambiarEstadoModal2}
            titulo2={"Actualizar categoria"}
            idEdit={idEdit}
            setCategorias={setCategorias}
            categorias={categorias}
          ></ModalupCategoria>
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
                    placeholder="Buscar categoria"
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

              <PDFGenerator data={categorias} />

              <button onClick={getData}>
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>
          </div>
          <hr></hr>
          <br></br>

          {/* //----------------VERSION MOVIL ------------------------------ */}
          <div className="proveedorMovil">
            {result.map((categorias, index) => (
              <div className="ContenedorProveedores" key={index}>
                <div className="imgPerfil">
                  <div className="proveedorID">
                    <p>ID</p>
                    <span>{categorias.idcategoria}</span>
                  </div>
                  <img
                    src={avatar}
                    className="avatar"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(categorias.idcategoria)
                    }
                  />
                </div>

                <div
                  className="datoProveedor"
                  onClick={() =>
                    cambiarEstadoModal2(!estadoModal2) &
                    setIdEdit(categorias.idcategoria)
                  }
                >
                  <div>
                    <h3>{categorias.categoria}</h3>
                  </div>
                  {/* <div>
                    <h5>NIT: {categorias.nit}</h5>
                  </div>
                  <div>
                    <p>Telefono: {categorias.telefono_prov}</p>
                  </div> */}
                </div>
                <div className="controlBtP">
                  <button className="btEditarU">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(categorias.idcategoria)}
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
                  <h3>Categoria: </h3>
                </div>
                {/* <div className="encD">
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
                </div> */}
              </div>
              <div className="encBT">
                <div>
                  <h3>Accion: </h3>
                </div>
              </div>
            </div>

            {result.map((categoria, index) => (
              <div className="ContenedorProveedores" key={index}>
                <div className="imgPerfil">
                  <div className="proveedorID">
                    <p>ID</p>
                    <span>{categoria.idcategoria}</span>
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
                    <h3>{categoria.categoria}</h3>
                  </div>
                  {/* <div>
                    <h5>{categoria.nit}</h5>
                  </div>
                  <div>
                    <p>{categoria.telefono_prov}</p>
                  </div>
                  <div>
                    <p>{categoria.email}</p>
                  </div>
                  <div>
                    <p>{categoria.direccion_prov}</p>
                  </div> */}
                </form>
                <div className="controlBtP">
                  <button
                    className="btEditarU"
                    onClick={() =>
                      cambiarEstadoModal2(!estadoModal2) &
                      setIdEdit(categoria.idcategoria)
                    }
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <br />
                  <button
                    className="btEliminarU"
                    onClick={() => mostrarAlerta(categoria.idcategoria)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categoria;
