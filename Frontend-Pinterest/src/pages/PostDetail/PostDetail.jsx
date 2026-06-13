import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/organisms/Header/Header";
import "./PostDetail.scss";

export default function PostDetail() {
    const navigate = useNavigate();

    return (
        <div className="pagina-principal">
            <Header />
            <main className="contenedor-post">
                <div className="tarjeta-post">
                    <button className="boton-salir-post" onClick={() => navigate(-1)} aria-label="Volver atrás">
                        &times;
                    </button>
                    
                    <section className="contenedor-imagen-post">
                        <img 
                            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000" 
                            alt="Imagen en detalle" 
                            className="imagen-principal"
                        />
                    </section>

                    <section className="lado-detalles-post">
                        <div className="acciones-superiores">
                            <div className="acciones-izquierda">
                                <button className="boton-accion" aria-label="Me gusta">❤️</button>
                                <button className="boton-accion" aria-label="Compartir">🔗</button>
                            </div>
                            <button className="boton-guardar">Guardar</button>
                        </div>

                        <div className="info-post">
                            <h1 className="titulo-post">Gradiente Abstracto 3D</h1>
                            <p className="descripcion-post">Una hermosa representación visual de colores fluidos y formas abstractas entrelazadas, perfecta para fondos de pantalla y diseño UI.</p>
                        </div>

                        <div className="autor-post">
                            <div className="info-autor">
                                <figure className="avatar-autor">
                                    <span role="img" aria-label="Avatar creador">🎨</span>
                                </figure>
                                <div>
                                    <h3>Creative Studio</h3>
                                    <span>12.4k seguidores</span>
                                </div>
                            </div>
                            <button className="boton-seguir">Seguir</button>
                        </div>
                        
                        <header className="cabecera-comentarios">
                            <h2>Comentarios</h2>
                            <span className="contador-comentarios">2 comentarios</span>
                        </header>

                        <section className="lista-comentarios">
                            <article className="item-comentario">
                                <figure className="avatar-usuario">
                                    <span role="img" aria-label="Avatar">🏌️</span>
                                </figure>
                                <div className="contenido-comentario">
                                    <h3>Juan Báez</h3>
                                    <p>Buena imagen, pero que tal si publican como reparar un skoda que esta casi dañado?</p>
                                    <time dateTime="2026-05-23">Hace 1 día</time>
                                </div> 
                            </article>

                            <article className="item-comentario">
                                <figure className="avatar-usuario">
                                    <span role="img" aria-label="Avatar">👤</span>
                                </figure>
                                <div className="contenido-comentario">
                                    <h3>Steven Cazar</h3>
                                    <p>Hola acá se puede poner omfg?</p>
                                    <time dateTime="2026-05-24">Hace 20 min</time>
                                </div>
                            </article>
                        </section>
                        
                        <footer className="seccion-agregar-comentario">
                            <form className="formulario-comentario">
                                <figure className="avatar-actual">
                                    <span role="img" aria-label="Tu Avatar">🐐</span>
                                </figure>
                                <div className="envoltura-input">
                                    <textarea placeholder="Agrega un comentario" rows="2" required></textarea>
                                    <button type="submit" className="boton-enviar-comentario">Enviar</button>
                                </div>
                            </form>
                        </footer>
                    </section>
                </div>
            </main>
        </div>
    );
}