import React from "react";
import Header from "../../components/organisms/Header/Header";
import Hero from "../../components/organisms/Hero/Hero";
import CategoryBar from "../../components/organisms/CategoryBar/CategoryBar";

export default function Index() {
    return (
        <div className="pagina-principal">
            <Header />
            <main className="contenedor-feed">
                <Hero />
                <CategoryBar />
                {}
            </main>
        </div>
    );
}