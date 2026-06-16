import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.scss";
import Button from "../../components/atoms/Button/Button";
import Input from "../../components/atoms/Input/Input";
import PasswordInput from "../../components/molecules/PasswordInput/PasswordInput";

export default function Register() {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [terminosAceptados, setTerminosAceptados] = useState(false);
    const navigate = useNavigate();

    const calcularEdad = (fecha) => {
        const hoy = new Date();
        const nacimiento = new Date(fecha);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad;
    };

    async function handleSubmit(event) {
        event.preventDefault();
        
        if (!fechaNacimiento) {
            alert("Por favor, ingresa tu fecha de nacimiento");
            return;
        }
        
        if (calcularEdad(fechaNacimiento) < 18) {
            alert("Debes tener al menos 18 años para registrarte en U|Gallery.");
            return;
        }

        if (!terminosAceptados) {
            alert("Debes aceptar los Términos y Condiciones para continuar.");
            return;
        }

        const datos = { correo, password, fechaNacimiento };
        
        try {
            const response = await fetch("http://localhost:8000/registro/", {
                method: "POST",
                body: JSON.stringify(datos),
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();
            
            if (data.success) {
                alert("Usuario registrado exitosamente");
                navigate("/login");
            } else {
                alert(data.detail || "Error en el registro");
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

                    <div className="contenedor-checkbox">
                        <label>
                            <input 
                                type="checkbox" 
                                checked={terminosAceptados}
                                onChange={(e) => setTerminosAceptados(e.target.checked)}
                            />
                            <span>Acepto los <Link to="/terms">Términos y Condiciones</Link></span>
                        </label>
                    </div>

                    <Button texto="Continuar" tipo="submit" />
                </form>

                <footer className="pie-formulario">
                    <p className="texto-login">
                        ¿Ya eres miembro? <Link to="/login">Iniciar sesión</Link>
                    </p>
                </footer>
            </main>
        </div>
    );
}