import React, { useState } from "react";
import Header from "../../components/organisms/Header/Header";
import Hero from "../../components/organisms/Hero/Hero";
import CategoryBar from "../../components/organisms/CategoryBar/CategoryBar";
import GalleryGrid from "../../components/organisms/GalleryGrid/GalleryGrid";
import "./Index.scss";

export default function Index() {
    const [query, setQuery] = useState(null);

    return (
        <div className="pagina-principal">
            <Header />
            <main className="contenedor-feed">
                <Hero />
                <CategoryBar alSeleccionar={setQuery} categoriaSeleccionada={query} />
                <GalleryGrid query={query} shuffle={true} />
            </main>
        </div>
    );
}