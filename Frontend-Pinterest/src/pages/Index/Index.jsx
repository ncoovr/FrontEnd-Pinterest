import React from "react";
import Header from "../../components/organisms/Header/Header";
import Hero from "../../components/organisms/Hero/Hero";
import CategoryBar from "../../components/organisms/CategoryBar/CategoryBar";
import GalleryGrid from "../../components/organisms/GalleryGrid/GalleryGrid";
import "./Index.scss";

export default function Index() {
    return (
        <div className="pagina-principal">
            <Header />
            <main className="contenedor-feed">
                <Hero />
                <CategoryBar />
                <GalleryGrid />
            </main>
        </div>
    );
}