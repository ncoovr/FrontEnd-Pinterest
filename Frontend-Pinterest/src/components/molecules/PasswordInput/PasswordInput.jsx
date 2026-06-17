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
                    aria-label={mostrar ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                    {mostrar ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                            <circle cx="12" cy="12" r="3" />
                            <path d="M4.5 4.5l15 15" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}