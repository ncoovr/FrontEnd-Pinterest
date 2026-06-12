import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/organisms/Header/Header";
import GalleryGrid from "../../components/organisms/GalleryGrid/GalleryGrid";
import EditProfileModal from "../../components/organisms/EditProfileModal/EditProfileModal";
import perfilImg from "../../assets/images/perfil.webp";
import "./Profile.scss";

export default function Profile() {
    const location = useLocation();

    const [nombre, setNombre] = useState("Nicolás Andrés Velasco Reyes");
    const [bio, setBio] = useState("Estudiante de Ingeniería en Sistemas. Apasionado por la carrera, el desarrollo y el aprendizaje autónomo.");
    const [fotoPerfil, setFotoPerfil] = useState(perfilImg);
    const [modalAbierto, setModalAbierto] = useState(false);

    useEffect(() => {
        if (location.state?.abrirEdicion) {
            setModalAbierto(true);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    function guardarPerfil(nuevoNombre, nuevaBio, nuevaFotoUrl) {
        setNombre(nuevoNombre);
        setBio(nuevaBio);
        if (nuevaFotoUrl) {
            setFotoPerfil(nuevaFotoUrl);
        }
    }

    return (
        <div className="pagina-principal">
            <Header />
            
            <main className="pagina-perfil">
                <section className="cabecera-perfil">
                    <article className="tarjeta-usuario">
                        <img src={fotoPerfil} alt="Avatar del usuario" className="avatar-principal" />
                        <div className="informacion-usuario">
                            <h1 className="nombre-perfil">{nombre}</h1>
                            <p className="bio-perfil">{bio}</p>
                        </div>
                    </article>
                    
                    <button className="boton-editar" onClick={() => setModalAbierto(true)}>
                        &#9998; Editar perfil
                    </button>
                </section>

                <section className="seccion-pestanas">
                    <nav className="pestanas-izquierda">
                        <a href="#" className="enlace-pestana">Destacados <span>0</span></a>
                        <a href="#" className="enlace-pestana activo">Creados <span>18</span></a>
                        <a href="#" className="enlace-pestana">Guardados</a>
                    </nav>
                    
                    <menu className="filtros-derecha">
                        <button className="boton-filtro">Favoritos &#9662;</button>
                    </menu>
                </section>

                <GalleryGrid />
            </main>

            {modalAbierto && (
                <EditProfileModal 
                    nombreActual={nombre} 
                    bioActual={bio} 
                    fotoActual={fotoPerfil}
                    alCerrar={() => setModalAbierto(false)} 
                    alGuardar={guardarPerfil} 
                />
            )}
        </div>
    );
}