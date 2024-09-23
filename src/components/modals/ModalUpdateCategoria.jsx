import React, { useEffect, useState } from "react";
import styled from "styled-components";
import swal from "sweetalert2";

const ModalupCategoria = ({
  children,
  estado2,
  cambiarEstado2,
  titulo2,
  idEdit,
  setCategorias,
  categorias,
}) => {
  const [categoria, setCategoria] = useState({});
  
  
  //const URL = import.meta.env.VITE_URL;
  const URL = "http://localhost:3000/";

  const getDataUp = async (idcategoria) => {
    try {
      const response = await fetch(URL + `categoria/${idcategoria}`, {
        headers: { "content-Type": "application/json" },
      });
      const categoria = await response.json();
      setCategoria(categoria);
      setCategoriaoUP({
        idcategoria: categoria.idcategoria,
        categoria: categoria.categoria,
        // nit: categoria.nit,
        // telefono_prov: categoria.telefono_prov,
        // email: categoria.email,
        // direccion_prov: categoria.direccion_prov,
      });
      console.log(categoria);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(categoria);
  useEffect(() => {
    if (idEdit) {
      getDataUp(idEdit);
    }
  }, [idEdit]);

  //-------------capurar datos de actualizadcoin de usuario-------------------

  const [categoriaUP, setCategoriaoUP] = useState({
    idcategoria: "",
    categoria: "",
    // nit: "",
    // telefono_prov: "",
    // email: "",
    // direccion_prov: "",
  });

  const onChangeData = (e) => {
    setCategoriaoUP({ ...categoriaUP, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  //----------------------Evento de envio del formulario

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(dataProduct);

    try {
      const response = await fetch(URL + `categoria/${categoriaUP.idcategoria}`, {
        method: "PUT",
        body: JSON.stringify(categoriaUP),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.json();
      console.log(data);
      console.log(response);
      setCategorias(
        categorias.map((categoria) =>
          categoria.idcategoria === categoriaUP.idcategoria ? categoriaUP : categoria
        )
      );
      cambiarEstado2(false);
      //Si el servidor devuelve codigo 200 de confirmación
      //lanza alerta de guardado correctamente
      if (response.status === 200) {
        swal.fire({
          title: "Categoria Actualizado!",
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
      } else {
        swal.fire({
          title: "Error al Actualizar!",
          icon: "error",
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
    } catch (error) {
      console.log(error.massage);
    }
  };

  //----------------------------------

  // ------------------------ FIN ACTUALIZAR PROVEEDOR ---------------------------------

  return (
    <>
      {estado2 && (
        <Overlay>
          <ContenedorModal>
            <EncabezadoModal>
              <h3>{titulo2}</h3>
            </EncabezadoModal>
            <BotonCerrar onClick={() => cambiarEstado2(false)}>
              <span className="material-symbols-outlined">close</span>
            </BotonCerrar>
            <div className="ContenedorEditarUsuario">
              <form className="nuevoUserForm">
                <div className="itemUser">
                  <label>id: </label>
                  <input
                    // {...register("iduser")}
                    type="text"
                    id="idUser"
                    placeholder="ID"
                    value={categoriaUP.idcategoria}
                    name="idcategoria"
                    onChange={(e) => onChangeData(e)}
                    disabled
                    selected
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Categoria: </label>
                  <input
                    // {...register("nombre")}
                    value={categoriaUP.categoria}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="nombreUser"
                    name="categoria"
                    placeholder="Categoria"
                  ></input>
                </div>

                {/* <div className="itemUser">
                  <label>NIT: </label>
                  <input
                    // {...register("apellido")}
                    value={categoriaUP.nit}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="apellidoUser"
                    name="nit"
                    placeholder="NIT"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Telefono: </label>
                  <input
                    // {...register("telefono")}
                    value={categoriaUP.telefono_prov}
                    onChange={(e) => onChangeData(e)}
                    type="number"
                    id="telefonoUser"
                    name="telefono_prov"
                    placeholder="Telefono"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Correo: </label>
                  <input
                    // {...register("email")}
                    value={categoriaUP.email}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="emailUser"
                    name="email"
                    placeholder="Correo electronico"
                  ></input>
                </div>

                <div className="itemUser">
                  <label>Direccion: </label>
                  <input
                    // {...register("contrasenia")}
                    value={categoriaUP.direccion_prov}
                    onChange={(e) => onChangeData(e)}
                    type="text"
                    id="passwordUser"
                    name="direccion_prov"
                    placeholder="Contraseña"
                  ></input>
                </div> */}

                <br />

                <div className="bonotesNewUser">
                  <div>
                    <button
                      type="button"
                      onClick={() => cambiarEstado2(false)}
                      className="btcancelar"
                    >
                      Cancelar
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btGuardar"
                      onClick={handleSubmit}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {children}
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
};

export default ModalupCategoria;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 98;
`;

const ContenedorModal = styled.div`
  width: 400px;
  min-height: 100px;
  background: #fff;
  position: relative;
  border-radius: 15px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
  z-index: 99;
`;

const EncabezadoModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
`;
const BotonCerrar = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  align-items: center;
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;
  color: #e8e8e8;

  &:hover {
    background: #ff8a00;
    transition: 0.3s;
  }

  span {
    width: 100%;
    height: 100%;
  }
`;
