import React from "react";
import Header from "../../components/organisms/Header/Header";
import GalleryGrid from "../../components/organisms/GalleryGrid/GalleryGrid";
import perfilImg from "../../assets/images/perfil.webp"; // Importamos tu foto local
import "./Profile.scss";

export default function Profile() {
    return (
        <div className="pagina-principal">
            <Header />
            
            <main className="pagina-perfil">
                {}
                <section className="cabecera-perfil">
                    <article className="tarjeta-usuario">
                        <img src={perfilImg} alt="Avatar del usuario" className="avatar-principal" />
                        <div className="informacion-usuario">
                            <h1 className="nombre-perfil">Andrés Velasco</h1>
                            <p className="bio-perfil">Estudiante de Ingeniería en Sistemas. Apasionado por la carrera, el desarrollo en Java y el aprendizaje autónomo.</p>
                        </div>
                    </article>
                    <button className="boton-editar">
                        &#9998; Editar perfil
                    </button>
                </section>

                {}
                <section className="seccion-pestanas">
                    <nav className="pestanas-izquierda">
                        <a href="#" className="enlace-pestana">Destacados <span>0</span></a>
                        <a href="#" className="enlace-pestana activo">Galería <span>18</span></a>
                        <a href="#" className="enlace-pestana">Colecciones</a>
                    </nav>
                    
                    <menu className="filtros-derecha">
                        <button className="boton-filtro deshabilitado">Añadir a destacados</button>
                        <button className="boton-filtro">Fotos y videos &#9662;</button>
                        <button className="boton-filtro">Favoritos &#9662;</button>
                    </menu>
                </section>

                {}
                <GalleryGrid />
            </main>
        </div>
    );
}