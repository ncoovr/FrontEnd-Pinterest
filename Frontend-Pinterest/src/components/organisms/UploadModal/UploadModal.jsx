import React, { useState } from "react";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import "./UploadModal.scss";

export default function UploadModal({ alCerrar }) {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [archivo, setArchivo] = useState(null);

    async function manejarEnvio(e) {
        e.preventDefault();
        
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Debes iniciar sesión para subir una publicación");
            return;
        }

        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("descripcion", descripcion);
        formData.append("file", archivo);

        try {
            const res = await fetch("http://localhost:8000/api/posts", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                alert("¡Publicación creada exitosamente!");
                alCerrar();
                window.location.reload();
            } else {
                const errorData = await res.json();
                alert(errorData.detail || "Error al subir la publicación");
            }
        } catch (error) {
            console.error("Error de conexión al subir publicación:", error);
            alert("Error al conectar con el servidor");
        }
    }

    return (
        <div className="fondo-modal" onClick={alCerrar}>
            {}
            <div className="contenedor-modal" onClick={(e) => e.stopPropagation()}>
                <header className="cabecera-modal">
                    <h2>Crear un nuevo Pin</h2>
                    <button className="boton-cerrar" onClick={alCerrar}>&times;</button>
                </header>

                <form onSubmit={manejarEnvio} className="formulario-subida">
                    <div className="zona-carga-imagen">
                        <label htmlFor="input-archivo" className="caja-carga">
                            {archivo ? (
                                <span className="nombre-archivo">{archivo.name}</span>
                            ) : (
                                <>
                                    <span className="icono-subida">⬆️</span>
                                    <p>Haz clic para subir una imagen</p>
                                </>
                            )}
                        </label>
                        <input 
                            type="file" 
                            id="input-archivo" 
                            accept="image/*" 
                            onChange={(e) => setArchivo(e.target.files[0])} 
                            style={{ display: "none" }} 
                            required
                        />
                    </div>

                    <div className="zona-detalles">
                        <Input 
                            id="titulo-pin"
                            label="Título"
                            tipo="text"
                            placeholder="Añade un título"
                            valor={titulo}
                            alCambiar={(e) => setTitulo(e.target.value)}
                        />
                        
                        <div className="grupo-formulario">
                            <label htmlFor="descripcion-pin">Descripción</label>
                            <textarea 
                                id="descripcion-pin"
                                placeholder="Cuéntale a todos de qué trata este Pin..."
                                rows="4"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            ></textarea>
                        </div>

                        <Button texto="Guardar" tipo="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}