import React from "react";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import "./Hero.scss";

export default function Hero() {
    return (
        <section className="seccion-hero">
            <article className="contenido-hero">
                <h1>Las mejores fotos del mundo mundial, imágenes inventadas para esta preciosa entrega.</h1>
                <SearchBar placeholder="Busca lo que gustes.." />
            </article>
        </section>
    );
}