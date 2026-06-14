import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadModal from "../UploadModal/UploadModal";
import perfilImg from "../../../assets/images/perfil.webp";
import "./Header.scss";

export default function Header() {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [usuario, setUsuario] = useState(null);
    
    const [modoOscuro, setModoOscuro] = useState(() => {
        return document.body.classList.contains("tema-oscuro");
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        
        fetch("http://localhost:8000/api/users/me", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error("No autorizado");
        })
        .then(data => {
            setUsuario(data);
        })
        .catch(err => {
            console.error("Error al obtener usuario en Header:", err);
        });
    }, []);

    function cerrarSesion() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    function alternarTema() {
        setModoOscuro(!modoOscuro);
    }

    useEffect(() => {
        if (modoOscuro) {
            document.body.classList.add("tema-oscuro");
        } else {
            document.body.classList.remove("tema-oscuro");
        }
    }, [modoOscuro]);

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
                        <span 
                            className="icono-accion" 
                            onClick={alternarTema}
                            aria-label="Alternar tema"
                            title="Cambiar tema"
                        >
                            {modoOscuro ? "☀️" : "🌙"}
                        </span>

                        <div className="contenedor-opciones">
                            <span 
                                className="icono-nav" 
                                onClick={() => setMenuAbierto(!menuAbierto)}
                            >
                                &#8230;
                            </span>
                            
                            {menuAbierto && (
                                <div className="menu-desplegable">
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
                            <img src={(usuario && usuario.avatar_url) ? usuario.avatar_url : perfilImg} alt="Tu Avatar" className="avatar-nav-img" />
                        </Link>
                    </menu>
                </nav>
            </header>

            {modalAbierto && <UploadModal alCerrar={() => setModalAbierto(false)} />}
        </>
    );
}