import React, { useState } from "react";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import "./EditProfileModal.scss";

export default function EditProfileModal({ alCerrar, nombreActual, bioActual, alGuardar }) {
    const [nombre, setNombre] = useState(nombreActual);
    const [bio, setBio] = useState(bioActual);

    function manejarEnvio(e) {
        e.preventDefault();
        alGuardar(nombre, bio);
        alCerrar();
    }

    return (
        <div className="fondo-modal" onClick={alCerrar}>
            <div className="contenedor-modal modal-edicion" onClick={(e) => e.stopPropagation()}>
                <header className="cabecera-modal">
                    <h2>Editar Perfil</h2>
                    <button className="boton-cerrar" onClick={alCerrar}>&times;</button>
                </header>

                <form onSubmit={manejarEnvio} className="formulario-edicion">
                    <Input 
                        id="editar-nombre"
                        label="Nombre"
                        tipo="text"
                        valor={nombre}
                        alCambiar={(e) => setNombre(e.target.value)}
                    />
                    
                    <div className="grupo-formulario">
                        <label htmlFor="editar-bio">Biografía</label>
                        <textarea 
                            id="editar-bio"
                            rows="4"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="acciones-modal">
                        <button type="button" className="boton-cancelar" onClick={alCerrar}>Cancelar</button>
                        <Button texto="Guardar cambios" tipo="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}