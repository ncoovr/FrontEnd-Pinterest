import React from 'react';

export default function Button({ texto, tipo = "button", onClick }) {
    return (
        <button type={tipo} className="boton-enviar" onClick={onClick}>
            {texto}
        </button>
    );
}