import React, { useState, useEffect } from "react";
import "./CategoryBar.scss";

export default function CategoryBar({ alSeleccionar, categoriaSeleccionada }) {
    const [categorias, setCategorias] = useState([]);
    const [dropdownAbierto, setDropdownAbierto] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8000/api/categories")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCategorias(data);
                }
            })
            .catch(err => console.error("Error al cargar categorías:", err));
    }, []);

    const imagenesCategorias = {
        "Todos": "https://images.pexels.com/photos/9329047/pexels-photo-9329047.jpeg?auto=compress&cs=tinysrgb&w=100",
        "Diseño 3D": "https://images.pexels.com/photos/16180051/pexels-photo-16180051.jpeg?auto=compress&cs=tinysrgb&w=100",
        "Naturaleza": "https://images.pexels.com/photos/1666667/pexels-photo-1666667.jpeg?auto=compress&cs=tinysrgb&w=100",
        "Arquitectura": "https://images.pexels.com/photos/36770103/pexels-photo-36770103.jpeg?auto=compress&cs=tinysrgb&w=100",
        "Fotografía": "https://images.pexels.com/photos/9221307/pexels-photo-9221307.jpeg?auto=compress&cs=tinysrgb&w=100",
        "Café & Comida": "https://images.pexels.com/photos/35719467/pexels-photo-35719467.jpeg?auto=compress&cs=tinysrgb&w=100",
        "Viajes": "https://images.pexels.com/photos/15988007/pexels-photo-15988007.jpeg?auto=compress&cs=tinysrgb&w=100"
    };

    const vistasCategorias = {
        "Todos": "10M+",
        "Diseño 3D": "125.4K",
        "Naturaleza": "1.2M",
        "Arquitectura": "540.3K",
        "Fotografía": "2.4M",
        "Café & Comida": "900.5K",
        "Viajes": "1.7M"
    };

    function seleccionar(nombre) {
        if (nombre === "Todos") {
            alSeleccionar(null);
        } else {
            let searchTerm = nombre;
            if (nombre === "Café & Comida") searchTerm = "Café";
            if (nombre === "Viajes") searchTerm = "viaje";
            alSeleccionar(searchTerm);
        }
        setDropdownAbierto(false);
    }

    const mostrarSeleccionada = (catName) => {
        if (!categoriaSeleccionada && catName === "Todos") return true;
        if (categoriaSeleccionada === catName) return true;
        if (categoriaSeleccionada === "Café" && catName === "Café & Comida") return true;
        if (categoriaSeleccionada === "viaje" && catName === "Viajes") return true;
        return false;
    };

    return (
        <section className="seccion-tendencias">
            <header className="cabecera-tendencias" style={{ position: "relative" }}>
                <button 
                    className="boton-tendencia" 
                    onClick={() => setDropdownAbierto(!dropdownAbierto)}
                >
                    Categorías {categoriaSeleccionada ? `: ${categoriaSeleccionada}` : ""} &#9662;
                </button>

                {dropdownAbierto && (
                    <div className="dropdown-categorias" style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        backgroundColor: "#24252a",
                        border: "1px solid #3a3b3c",
                        borderRadius: "12px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                        zIndex: 100,
                        minWidth: "180px",
                        marginTop: "8px",
                        padding: "8px 0"
                    }}>
                        {categorias.map(cat => {
                            const estaSeleccionada = mostrarSeleccionada(cat.name);
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => seleccionar(cat.name)}
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        padding: "10px 16px",
                                        background: "none",
                                        border: "none",
                                        color: estaSeleccionada ? "#e60023" : "#ffffff",
                                        textAlign: "left",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        fontWeight: "600"
                                    }}
                                >
                                    {cat.name}
                                </button>
                            );
                        })}
                    </div>
                )}
            </header>
            
            <nav className="contenedor-etiquetas">
                {categorias.filter(c => c.name !== "Todos").map((cat) => {
                    const esActiva = mostrarSeleccionada(cat.name);
                    return (
                        <button 
                            key={cat.id} 
                            className={`etiqueta ${esActiva ? "activa" : ""}`}
                            onClick={() => seleccionar(cat.name)}
                            style={{
                                border: esActiva ? "2px solid #e60023" : "1px solid #3a3b3c",
                                backgroundColor: esActiva ? "rgba(230, 0, 35, 0.15)" : "#24252a",
                                color: esActiva ? "#e60023" : "#ffffff",
                                outline: "none"
                            }}
                        >
                            <span 
                                className="imagen-etiqueta" 
                                style={{ backgroundImage: `url(${imagenesCategorias[cat.name] || imagenesCategorias["Todos"]})` }}
                            ></span> 
                            {cat.name} <span style={{ marginLeft: "5px", color: esActiva ? "rgba(230, 0, 35, 0.7)" : "#a5a6a9" }}>{vistasCategorias[cat.name] || "10K"}</span>
                        </button>
                    );
                })}
            </nav>
        </section>
    );
}