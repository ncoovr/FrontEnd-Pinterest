import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import Button from "../../components/atoms/Button/Button";
import Input from "../../components/atoms/Input/Input";
import PasswordInput from "../../components/molecules/PasswordInput/PasswordInput";

export default function Register() {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const datos = { correo, password, fechaNacimiento };
        
        try {
            const response = await fetch("http://localhost:8000/registro/", {
                method: "POST",
                body: JSON.stringify(datos),
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();
            
            if (data.success) {
                navigate("/login");
            } else {
                console.log("Error en el registro");
            }
        } catch (error) {
            console.error("Error de conexión", error);
        }
    }

    return (
        <div className="pantalla-centrada">
            <main className="contenedor-registro">
                <header className="cabecera-registro">
                    <figure className="logo">
                        <span role="img" aria-label="Logo U|Gallery">🐐</span>
                    </figure>
                    <h1>Te damos la bienvenida a U|Gallery</h1>
                    <p>Encuentra nuevas ideas para experimentar</p>
                </header>

                <form onSubmit={handleSubmit}>
                    <Input 
                        id="registro-correo"
                        label="Correo electrónico"
                        tipo="email"
                        placeholder="Correo electrónico"
                        valor={correo}
                        alCambiar={(e) => setCorreo(e.target.value)}
                    />

                    <PasswordInput 
                        id="registro-password"
                        label="Contraseña"
                        placeholder="Crea una contraseña"
                        valor={password}
                        alCambiar={(e) => setPassword(e.target.value)}
                    />
                    <small className="texto-ayuda">Usa ocho o más letras, números y símbolos</small>

                    <Input 
                        id="registro-fecha"
                        label="Fecha de nacimiento"
                        tipo="date"
                        placeholder=""
                        valor={fechaNacimiento}
                        alCambiar={(e) => setFechaNacimiento(e.target.value)}
                    />

                    <Button texto="Continuar" tipo="submit" />
                </form>

                <footer className="pie-formulario">
                    <p className="texto-login">
                        ¿Ya eres miembro? <a href="/login">Iniciar sesión</a>
                    </p>
                </footer>
            </main>
        </div>
    );
}