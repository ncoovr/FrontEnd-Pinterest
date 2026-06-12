import React from 'react';
import './Button.scss'; 
export default function Button({ texto, tipo = "button", onClick }) {
    return (
        <button type={tipo} className="btn-submit" onClick={onClick}>
            {texto}
        </button>
    );
}