import React from "react";
import SearchBar from "../../molecules/SearchBar/SearchBar";
import "./Hero.scss";

export default function Hero() {
    return (
        <section className="seccion-hero">
            <article className="contenido-hero">
                <h1>Explora las mejores fotos en tendencia y descubre nuevas ideas y experiencias</h1>
                <SearchBar placeholder="Busca lo que gustes.." />
            </article>
        </section>
    );
}