import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate()
  const [showInventarioSubmenu, setShowInventarioSubmenu] = useState(false);
  const [showVentasSubmenu, setShowVentasSubmenu] = useState(false);

  // Función para alternar el estado del sidebar (expandir/reducir)
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Funciones para desplegar/ocultar submenús
  const toggleInventarioSubmenu = () => {
    setShowInventarioSubmenu(!showInventarioSubmenu);
  };

  const toggleVentasSubmenu = () => {
    setShowVentasSubmenu(!showVentasSubmenu);
  };

 // Función para manejar la navegación
 const handleNavigation = (path) => {
    navigate(path);  // Navega a la ruta proporcionada
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`d-flex flex-column p-3 ${isCollapsed ? 'collapsed' : ''}`}
        style={{ width: isCollapsed ? '80px' : '250px', height: '100vh', transition: 'width 0.3s ease', backgroundColor: '#007bff' }}
      >
        {/* Botón para expandir/reducir el sidebar */}
        <button className="btn btn-outline-secondary mb-3" onClick={toggleSidebar}>
          <i className={`bi ${isCollapsed ? 'bi-arrow-right-square' : 'bi-arrow-left-square'}`}></i>
        </button>

        <a href="/" className={`d-flex align-items-center mb-3 me-md-auto link-dark text-decoration-none ${isCollapsed ? 'justify-content-center' : ''}`}>
          <span className={`fs-4 ${isCollapsed ? 'd-none' : ''}`}>Menú</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className={`text-white fw-bold nav-link link-dark ${isCollapsed ? 'text-center' : ''}`}>
              <i className="bi bi-house-door"></i>
              <span className={isCollapsed ? 'd-none' : 'ms-2'}>Inicio</span>
            </a>
          </li>
          <li>
            <a href="#" className={`text-white fw-bold nav-link link-dark ${isCollapsed ? 'text-center' : ''}`}
            onClick={() => handleNavigation('/Usuario')}  // Redirige a /Usuario
            >
              <i className="bi bi-speedometer2"></i>
              <span className={isCollapsed ? 'd-none' : 'ms-2'}>Configuracion</span>
            </a>
          </li>

          {/* Inventario con submenú */}
          <li className="nav-item">
            <a href="#" className={`text-white fw-bold nav-link link-dark ${isCollapsed ? 'text-center' : ''}`} onClick={toggleInventarioSubmenu}>
              <i className="bi bi-box-seam"></i>
              <span className={isCollapsed ? 'd-none' : 'ms-2'}>Inventario</span>
              <i className={`bi ${showInventarioSubmenu ? 'bi-chevron-up' : 'bi-chevron-down'} float-end ${isCollapsed ? 'd-none' : ''}`}></i>
            </a>
            {/* Submenú de inventario */}
            {showInventarioSubmenu && !isCollapsed && (
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <a href="#" className="nav-link link-dark">Ver productos</a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link link-dark">Añadir producto</a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link link-dark">Categorías</a>
                </li>
              </ul>
            )}
          </li>

          {/* Ventas con submenú */}
          <li className="nav-item">
            <a href="#" className={`text-white fw-bold nav-link link-dark ${isCollapsed ? 'text-center' : ''}`} onClick={toggleVentasSubmenu}>
              <i className="bi bi-cart"></i>
              <span className={isCollapsed ? 'd-none' : 'ms-2'}>Ventas</span>
              <i className={`bi ${showVentasSubmenu ? 'bi-chevron-up' : 'bi-chevron-down'} float-end ${isCollapsed ? 'd-none' : ''}`}></i>
            </a>
            {/* Submenú de ventas */}
            {showVentasSubmenu && !isCollapsed && (
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <a href="#" className="nav-link link-dark">Historial de ventas</a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link link-dark">Realizar venta</a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <a href="#" className={`text-white fw-bold nav-link link-dark ${isCollapsed ? 'text-center' : ''}`}>
              <i className="bi bi-people"></i>
              <span className={isCollapsed ? 'd-none' : 'ms-2'}>Clientes</span>
            </a>
          </li>
          <li>
            <a href="#" className={`text-white fw-bold nav-link link-dark ${isCollapsed ? 'text-center' : ''}`}>
              <i className="bi bi-bar-chart"></i>
              <span className={isCollapsed ? 'd-none' : 'ms-2'}>Reportes</span>
            </a>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a href="#" className={`d-flex align-items-center link-dark text-decoration-none dropdown-toggle ${isCollapsed ? 'justify-content-center' : ''}`} id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://via.placeholder.com/40" alt="perfil" width="32" height="32" className="rounded-circle me-2" />
            <strong className={isCollapsed ? 'd-none' : ''}>Usuario</strong>
          </a>
          <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
            <li><a className="dropdown-item" href="#">Perfil</a></li>
            <li><a className="dropdown-item" href="#">Ajustes</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Cerrar sesión</a></li>
          </ul>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="content p-4">
        <h1>Ferreteria El Manantial</h1>
        {/* Aquí puedes renderizar el contenido principal */}
      </div>
    </div>
  );
};

export default Sidebar;
