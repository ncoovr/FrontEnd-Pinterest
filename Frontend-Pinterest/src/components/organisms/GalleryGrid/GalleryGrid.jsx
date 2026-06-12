import React from "react";
import { Link } from "react-router-dom";
import "./GalleryGrid.scss";

export default function GalleryGrid() {
    const imagenes = [
        "https://images.pexels.com/photos/9329047/pexels-photo-9329047.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/9221307/pexels-photo-9221307.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1666667/pexels-photo-1666667.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/36770103/pexels-photo-36770103.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/30150825/pexels-photo-30150825.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/35719467/pexels-photo-35719467.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/15988007/pexels-photo-15988007.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/12379827/pexels-photo-12379827.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/3724836/pexels-photo-3724836.jpeg?auto=compress&cs=tinysrgb&w=600"
    ];

    return (
        <section className="cuadricula-galeria">
            {imagenes.map((imgUrl, index) => (
                <Link to="/post" key={index} className="enlace-tarjeta">
                    <img src={imgUrl} alt={`Contenido de galería ${index + 1}`} />
                </Link>
            ))}
        </section>
    );
}