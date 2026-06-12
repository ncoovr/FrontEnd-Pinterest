import React, { useState } from 'react';

export default function PasswordInput({ id, label, placeholder, valor, alCambiar }) {
    const [mostrar, setMostrar] = useState(false);

    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <div className="password-wrapper">
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
                    className="toggle-password" 
                    onClick={() => setMostrar(!mostrar)}
                    aria-label="Mostrar u ocultar tu contraseña"
                >
                    {mostrar ? "🙈" : "👁️"}
                </button>
            </div>
            <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
    );
}