import React from "react";
import "./SearchBar.scss";

export default function SearchBar({ placeholder }) {
    return (
        <form className="barra-busqueda">
            <input type="text" placeholder={placeholder} />
            <button type="submit" className="boton-busqueda">&#128269;</button>
        </form>
    );
}