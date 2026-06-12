import React from "react";
import "./CategoryBar.scss";

export default function CategoryBar() {
    const categorias = [
        { nombre: "Minimalismo", vistas: "15.4K", img: "https://images.pexels.com/photos/9329047/pexels-photo-9329047.jpeg?auto=compress&cs=tinysrgb&w=100" },
        { nombre: "Huskies", vistas: "503.3K", img: "https://images.pexels.com/photos/9221307/pexels-photo-9221307.jpeg?auto=compress&cs=tinysrgb&w=100" },
        { nombre: "AWS Cloud", vistas: "240.8K", img: "https://images.pexels.com/photos/1666667/pexels-photo-1666667.jpeg?auto=compress&cs=tinysrgb&w=100" },
        { nombre: "The Beatles", vistas: "1.7M", img: "https://images.pexels.com/photos/36770103/pexels-photo-36770103.jpeg?auto=compress&cs=tinysrgb&w=100" },
        { nombre: "Horizon FW", vistas: "410.7K", img: "https://images.pexels.com/photos/30150825/pexels-photo-30150825.jpeg?auto=compress&cs=tinysrgb&w=100" }
    ];

    return (
        <section className="seccion-tendencias">
            <header className="cabecera-tendencias">
                <h2>Galería</h2>
                <button className="boton-tendencia">Categorías &#9662;</button>
            </header>
            
            <nav className="contenedor-etiquetas">
                {categorias.map((cat, index) => (
                    <button key={index} className="etiqueta">
                        <span 
                            className="imagen-etiqueta" 
                            style={{ backgroundImage: `url(${cat.img})` }}
                        ></span> 
                        {cat.nombre} <span>{cat.vistas}</span>
                    </button>
                ))}
            </nav>
        </section>
    );
}