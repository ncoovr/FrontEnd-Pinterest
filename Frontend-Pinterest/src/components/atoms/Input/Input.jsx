import React from 'react';

export default function Input({ id, label, tipo, placeholder, valor, alCambiar }) {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input 
                type={tipo} 
                id={id} 
                placeholder={placeholder} 
                required 
                value={valor}
                onChange={alCambiar}
            />
        </div>
    );
}