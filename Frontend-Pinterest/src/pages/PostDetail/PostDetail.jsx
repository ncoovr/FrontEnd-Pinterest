import React from "react";
import Header from "../../components/organisms/Header/Header";
import "./PostDetail.scss";

export default function PostDetail() {
    return (
        <div className="pagina-principal">
            <Header />
            <main className="contenedor-post">
                <div className="tarjeta-post">
                    
                    <section className="contenedor-imagen-post">
                        <img 
                            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000" 
                            alt="Imagen en detalle" 
                            className="imagen-principal"
                        />
                    </section>

                    <section className="lado-detalles-post">
                        
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