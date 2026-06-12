import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadModal from "../UploadModal/UploadModal";
import perfilImg from "../../../assets/images/perfil.webp";
import "./Header.scss";

export default function Header() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const navigate = useNavigate();

    function cerrarSesion() {
        navigate("/login");
    }

    return (
        <>
            <header className="encabezado">
                <nav className="navegacion-superior">
                    <Link to="/index" className="logo">
                        <span role="img" aria-label="Logo U|Gallery">🐐</span>
                        <span className="texto-logo">U|Gallery</span>
                    </Link>
                    
                    <nav className="navegacion-central">
                        <Link to="/index">Explorar</Link>
                        
                        <button 
                            className="boton-crear-nav" 
                            onClick={() => setModalAbierto(true)}
                            aria-label="Crear nuevo Pin"
                        >
                            +
                        </button>

                        <Link to="/profile">Perfil</Link>
                    </nav>

                    <menu className="menu-derecho">
                        <div className="contenedor-opciones">
                            <span 
                                className="icono-nav" 
                                onClick={() => setMenuAbierto(!menuAbierto)}
                            >
                                &#8230;
                            </span>
                            
                            {menuAbierto && (
                                <div className="menu-desplegable">
                                    {/* Pasamos el state={{ abrirEdicion: true }} */}
                                    <Link 
                                        to="/profile" 
                                        state={{ abrirEdicion: true }} 
                                        onClick={() => setMenuAbierto(false)}
                                    >
                                        Editar perfil
                                    </Link>
                                    <button onClick={cerrarSesion}>Cerrar sesión</button>
                                </div>
                            )}
                        </div>

                        <Link to="/profile">
                            <img src={perfilImg} alt="Tu Avatar" className="avatar-nav-img" />
                        </Link>
                    </menu>
                </nav>
            </header>

            {modalAbierto && <UploadModal alCerrar={() => setModalAbierto(false)} />}
        </>
    );
}