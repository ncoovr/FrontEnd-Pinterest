import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event){
            event.preventDefault()
            const datos = {
                correo,
                password
            }
            const response = await fetch(
                "http://localhost:8000/login/",
                {
                    method: "POST",
                    body: JSON.stringify(datos),
                    headers: {
                        "Content-Type":"application/json"
                    }
                }
            )
            const data = await response.json()
            console.log(data)
            if(data.success){
                navigate("/Index")
            } else {
                console.log("Login incorrecto")
            }
    }
    return (
        <>

        <main className="login-container">
            <header className="header-brand">
            <figure className="logo">
                <span role="img" aria-label="Logo Pinterest">
                🐐
                </span>
            </figure>
            <h1>Te damos la bienvenida a esta web page</h1>
            <p>Introduce tus credenciales para ingresar</p>
            </header>

            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="login-email">Correo Electrónico</label>
                <input
                type="email"
                id="login-email"
                placeholder="Correo Electrónico"
                required
                value={correo}
                onChange = {(event)=> 
                    setCorreo(event.target.value)
                }
                />
            </div>

            <div className="form-group">
                <label htmlFor="login-password">Contraseña</label>
                <div className="password-wrapper">
                <input
                    type="password"
                    id="login-password"
                    placeholder="Introduce tu contraseña"
                    required
                    value={password}
                    onChange={(event)=>
                        setPassword(event.target.value)
                    }
                />
                <button
                    type="button"
                    className="toggle-password"
                    aria-label="Mostrar u ocultar tu contraseña"
                ></button>
                </div>
                <a href="#" className="forgot-password">
                ¿Olvidaste tu contraseña?
                </a>
            </div>

            <button type="submit" className="btn-submit">
                Iniciar Sesión
            </button>
            </form>

            <footer className="form-footer">
            <p className="register-redirect">
                ¿Aún no estás en la web? <a href="register.html">Regístrate</a>
            </p>
            </footer>
        </main>
        </>
    );
}

export default Login;
