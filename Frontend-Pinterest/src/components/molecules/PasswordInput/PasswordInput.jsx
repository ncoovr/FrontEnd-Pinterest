import React, { useState } from 'react';

export default function PasswordInput({ id, label, placeholder, valor, alCambiar }) {
    const [mostrar, setMostrar] = useState(false);

    return (
        <div className="grupo-formulario">
            <label htmlFor={id}>{label}</label>
            <div className="contenedor-clave">
                <input 
                    type={mostrar ? "text" : "password"} 
                    id={id} 
                    placeholder={placeholder} 
                    required 
                    value={valor}
                    onChange={alCambiar}
                />
                <button 
                    type="button" 
                    className="boton-ojito" 
                    onClick={() => setMostrar(!mostrar)}
                    aria-label="Mostrar u ocultar tu contraseña"
                >
                    {mostrar ? "🙈" : "👁️"}
                </button>
            </div>
            <a href="#" className="enlace-olvido">¿Olvidaste tu contraseña?</a>
        </div>
    );
}