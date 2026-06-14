import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./GalleryGrid.scss";

export default function GalleryGrid({ creatorId, likedBy, query, shuffle }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let url = "http://localhost:8000/api/posts";
        const params = [];
        if (creatorId) {
            params.push(`user_id=${creatorId}`);
        }
        if (likedBy) {
            params.push(`liked_by=${likedBy}`);
        }
        if (query) {
            params.push(`q=${encodeURIComponent(query)}`);
        }
        if (params.length > 0) {
            url += "?" + params.join("&");
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const sorted = shuffle ? [...data].sort(() => Math.random() - 0.5) : data;
                    setPosts(sorted);
                }
            })
            .catch(err => console.error("Error al cargar publicaciones:", err));
    }, [creatorId, likedBy, query, shuffle]);

    return (
        <section className="cuadricula-galeria">
            {posts.map((post) => (
                <Link to={`/post?id=${post.id_post}`} key={post.id_post} className="enlace-tarjeta">
                    <img src={post.image_url} alt={post.titulo} />
                </Link>
            ))}
            {posts.length === 0 && (
                <p className="sin-contenido">No hay publicaciones aún.</p>
            )}
        </section>
    );
}