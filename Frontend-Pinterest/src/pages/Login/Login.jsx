import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss"; 
import Button from "../../components/atoms/Button/Button";
import Input from "../../components/atoms/Input/Input";
import PasswordInput from "../../components/molecules/PasswordInput/PasswordInput";

export default function Login() {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const datos = { correo, password };
        
        try {
            const response = await fetch("http://localhost:8000/login/", {
                method: "POST",
                body: JSON.stringify(datos),
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();
            
            if (data.success) {
                navigate("/index");
            } else {
                console.log("Login incorrecto");
            }
        } catch (error) {
            console.error("Error al conectar con la API", error);
        }
    }

    return (
        <div className="pantalla-centrada">
            <main className="contenedor-login">
                <header className="cabecera-login">
                    <figure className="logo">
                        <span role="img" aria-label="Logo U|Gallery">🐐</span>
                    </figure>
                    <h1>Te damos la bienvenida a U|Gallery</h1>
                    <p>Introduce tus credenciales para ingresar</p>
                </header>

                <form onSubmit={handleSubmit}>
                    <Input 
                        id="login-email"
                        label="Correo Electrónico"
                        tipo="email"
                        placeholder="Tu correo"
                        valor={correo}
                        alCambiar={(e) => setCorreo(e.target.value)}
                    />

                    <PasswordInput 
                        id="login-password"
                        label="Contraseña"
                        placeholder="Introduce tu contraseña"
                        valor={password}
                        alCambiar={(e) => setPassword(e.target.value)}
                    />
                    
                    <a href="#" className="enlace-olvido">¿Olvidaste tu contraseña?</a>

                    <Button texto="Iniciar Sesión" tipo="submit" />
                </form>

                <footer className="pie-formulario">
                    <p className="texto-registro">
                        ¿Aún no estás en la web? <a href="/register">Regístrate</a>
                    </p>
                </footer>
            </main>
        </div>
    );
}