import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/organisms/Header/Header";
import GalleryGrid from "../../components/organisms/GalleryGrid/GalleryGrid";
import EditProfileModal from "../../components/organisms/EditProfileModal/EditProfileModal";
import perfilImg from "../../assets/images/perfil.webp";
import "./Profile.scss";

export default function Profile() {
    const location = useLocation();

    const [usuario, setUsuario] = useState(null);
    const [nombre, setNombre] = useState("Nicolás Andrés Velasco Reyes");
    const [bio, setBio] = useState("Estudiante de Ingeniería en Sistemas. Apasionado por la carrera, el desarrollo y el aprendizaje autónomo.");
    const [fotoPerfil, setFotoPerfil] = useState(perfilImg);
    const [modalAbierto, setModalAbierto] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch("http://localhost:8000/api/users/me", {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => {
            if (res.ok) return res.json();
            throw new Error("No autorizado");
        })
        .then(data => {
            setUsuario(data);
            setNombre(data.nombre || "");
            setBio(data.bio || "");
            if (data.avatar_url) {
                setFotoPerfil(data.avatar_url);
            }
        })
        .catch(err => console.error("Error al obtener perfil:", err));
    }, []);

    useEffect(() => {
        if (location.state?.abrirEdicion) {
            setModalAbierto(true);
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    async function guardarPerfil(nuevoNombre, nuevaBio, archivoNuevo) {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch("http://localhost:8000/api/users/me", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ nombre: nuevoNombre, bio: nuevaBio })
            });
            if (!res.ok) throw new Error("Error al actualizar perfil");
            const data = await res.json();
            setNombre(data.nombre);
            setBio(data.bio || "");

            if (archivoNuevo) {
                const formData = new FormData();
                formData.append("file", archivoNuevo);

                const avatarRes = await fetch("http://localhost:8000/api/users/me/avatar", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: formData
                });
                if (avatarRes.ok) {
                    const avatarData = await avatarRes.json();
                    setFotoPerfil(avatarData.avatar_url);
                    setUsuario(prev => prev ? { ...prev, avatar_url: avatarData.avatar_url } : null);
                } else {
                    console.error("Error al subir avatar");
                }
            }
            alert("Perfil actualizado con éxito");
        } catch (error) {
            console.error(error);
            alert("Error al actualizar el perfil");
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

                <GalleryGrid creatorId={usuario?.id_usuario} />
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