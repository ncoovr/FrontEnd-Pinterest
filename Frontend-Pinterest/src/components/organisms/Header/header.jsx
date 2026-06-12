import React, { useState } from "react";
import { Link } from "react-router-dom";
import UploadModal from "../UploadModal/UploadModal";
import "./Header.scss";

export default function Header() {
    const [modalAbierto, setModalAbierto] = useState(false);

    return (
        <>
            <header className="encabezado">
                <nav className="navegacion-superior">
                    <Link to="/index" className="logo">
                        <span role="img" aria-label="Logo U|Gallery">🐐</span>
                        <span className="texto-logo">U|Gallery</span>
                    </Link>
                    
                    <menu className="menu-derecho">
                        <button 
                             className="boton-crear-nav" 
                             onClick={() => setModalAbierto(true)}
                              aria-label="Crear nuevo Pin"
                                >
                             +
                        </button>

                        <span className="icono-nav">&#8230;</span>
                        <Link to="/profile">
                            <div className="avatar-nav">N</div>
                        </Link>
                    </menu>
                </nav>

                <nav className="navegacion-central">
                    <Link to="/index" className="activo">Inicio</Link>
                    <a href="#">Videos</a>
                    <a href="#">Galería</a>
                    <Link to="/profile">Perfil</Link>
                </nav>
            </header>

            {/* Si modalAbierto es true, se renderiza nuestro nuevo componente */}
            {modalAbierto && <UploadModal alCerrar={() => setModalAbierto(false)} />}
        </>
    );
}