import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

export default function Header() {
    return (
        <header className="encabezado">
            <nav className="navegacion-superior">
                <Link to="/index" className="logo">
                    <span role="img" aria-label="Logo U|Gallery">🐐</span>
                    <span className="texto-logo">U|Gallery</span>
                </Link>
                
                <menu className="menu-derecho">
                    <span className="icono-nav">&#8230;</span>
                    <Link to="/profile">
                        {/* Avatar temporal, luego lo podemos traer de la base de datos */}
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
    );
}