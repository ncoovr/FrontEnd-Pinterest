import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/organisms/Header/Header";
import "./PostDetail.scss";

export default function PostDetail() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const postId = searchParams.get("id");

    const [post, setPost] = useState(null);
    const [comentarioTexto, setComentarioTexto] = useState("");
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (!postId) return;
        const token = localStorage.getItem("token");
        const headers = token ? { "Authorization": `Bearer ${token}` } : {};

        if (token) {
            fetch("http://localhost:8000/api/users/me", { headers })
                .then(res => res.ok && res.json())
                .then(data => setCurrentUser(data))
                .catch(err => console.error("Error al obtener usuario actual:", err));
        }

        fetch(`http://localhost:8000/api/posts/${postId}`, { headers })
            .then(res => {
                if (res.ok) return res.json();
                throw new Error("No se pudo cargar el post");
            })
            .then(data => setPost(data))
            .catch(err => {
                console.error(err);
                alert("Publicación no encontrada");
                navigate("/index");
            });
    }, [postId, navigate]);

    async function handleLike() {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Inicia sesión para dar me gusta");
            return;
        }

        try {
            const res = await fetch(`http://localhost:8000/api/posts/${postId}/like`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setPost(prev => prev ? {
                    ...prev,
                    liked_by_me: data.liked,
                    likes_count: data.likes_count
                } : null);
            }
        } catch (error) {
            console.error("Error al dar like:", error);
        }
    }

    async function handleCommentSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Inicia sesión para comentar");
            return;
        }

        try {
            const res = await fetch(`http://localhost:8000/api/posts/${postId}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ content: comentarioTexto })
            });
            if (res.ok) {
                const nuevoComentario = await res.json();
                setPost(prev => prev ? {
                    ...prev,
                    comments: [...prev.comments, nuevoComentario]
                } : null);
                setComentarioTexto("");
            }
        } catch (error) {
            console.error("Error al comentar:", error);
        }
    }

    async function handleDelete() {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta publicación?")) return;
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch(`http://localhost:8000/api/posts/${postId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                alert("Publicación eliminada correctamente");
                navigate("/index");
            } else {
                alert("Error al eliminar la publicación");
            }
        } catch (error) {
            console.error("Error al eliminar publicación:", error);
        }
    }

    if (!post) {
        return (
            <div className="pagina-principal">
                <Header />
                <main className="contenedor-post" style={{textAlign: "center", padding: "50px"}}>
                    <h2>Cargando detalles de la publicación...</h2>
                </main>
            </div>
        );
    }

    const esDueno = currentUser && post.user_id === currentUser.id_usuario;

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
                            src={post.image_url} 
                            alt={post.titulo} 
                            className="imagen-principal"
                        />
                    </section>
 
                    <section className="lado-detalles-post">
                        <div className="acciones-superiores">
                            <div className="acciones-izquierda">
                                <button 
                                    className={`boton-accion ${post.liked_by_me ? 'liked' : ''}`} 
                                    onClick={handleLike} 
                                    aria-label="Me gusta"
                                >
                                    {post.liked_by_me ? "❤️" : "🤍"}
                                </button>
                                <span className="conteo-likes">{post.likes_count} likes</span>
                            </div>
                            <div className="acciones-derecha" style={{display: "flex", gap: "10px"}}>
                                {esDueno && (
                                    <button 
                                        className="boton-guardar" 
                                        style={{backgroundColor: "#e60023", color: "white"}}
                                        onClick={handleDelete}
                                    >
                                        Eliminar
                                    </button>
                                )}
                                <button className="boton-guardar">Guardar</button>
                            </div>
                        </div>
 
                        <div className="info-post">
                            <h1 className="titulo-post">{post.titulo}</h1>
                            <p className="descripcion-post">{post.descripcion}</p>
                        </div>
 
                        <div className="autor-post">
                            <div className="info-autor">
                                <figure className="avatar-autor">
                                    {post.autor_avatar ? (
                                        <img src={post.autor_avatar} alt="Avatar" className="avatar-autor-img" />
                                    ) : (
                                        <span role="img" aria-label="Avatar creador">🎨</span>
                                    )}
                                </figure>
                                <div>
                                    <h3>{post.autor_nombre}</h3>
                                    <span>Seguidor de U|Gallery</span>
                                </div>
                            </div>
                            <button className="boton-seguir">Seguir</button>
                        </div>
                        
                        <header className="cabecera-comentarios">
                            <h2>Comentarios</h2>
                            <span className="contador-comentarios">{post.comments.length} comentarios</span>
                        </header>
 
                        <section className="lista-comentarios">
                            {post.comments.map(c => (
                                <article className="item-comentario" key={c.id_comment}>
                                    <figure className="avatar-usuario">
                                        {c.usuario_avatar ? (
                                            <img src={c.usuario_avatar} alt="Avatar" className="avatar-comentario-img" />
                                        ) : (
                                            <span role="img" aria-label="Avatar">👤</span>
                                        )}
                                    </figure>
                                    <div className="contenido-comentario">
                                        <h3>{c.usuario_nombre}</h3>
                                        <p>{c.content}</p>
                                        <time dateTime={c.created_at}>{new Date(c.created_at).toLocaleDateString()}</time>
                                    </div> 
                                </article>
                            ))}
                            {post.comments.length === 0 && (
                                <p style={{padding: "20px", color: "gray", textAlign: "center"}}>Sé el primero en comentar.</p>
                            )}
                        </section>
                        
                        <footer className="seccion-agregar-comentario">
                            <form onSubmit={handleCommentSubmit} className="formulario-comentario">
                                <figure className="avatar-actual">
                                    {currentUser && currentUser.avatar_url ? (
                                        <img src={currentUser.avatar_url} alt="Tu Avatar" className="avatar-comentario-img" />
                                    ) : (
                                        <span role="img" aria-label="Tu Avatar">🐐</span>
                                    )}
                                </figure>
                                <div className="envoltura-input">
                                    <textarea 
                                        placeholder="Agrega un comentario" 
                                        rows="2" 
                                        value={comentarioTexto}
                                        onChange={(e) => setComentarioTexto(e.target.value)}
                                        required
                                    ></textarea>
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