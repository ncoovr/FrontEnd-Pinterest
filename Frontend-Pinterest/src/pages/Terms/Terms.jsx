import React from "react";
import { Link } from "react-router-dom";
import "./Terms.scss";

export default function Terms() {
    return (
        <div className="contenedor-terminos">
            <div className="tarjeta-terminos">
                <h1>Términos y Condiciones</h1>
                
                <p>Bienvenido a U|Gallery. Al acceder y utilizar nuestra plataforma, aceptas cumplir con los siguientes términos y condiciones.</p>
                
                <h2>1. Uso del Servicio</h2>
                <p>Te comprometes a utilizar la plataforma únicamente con fines legales y de una manera que no infrinja los derechos de terceros, ni restrinja o inhiba su uso y disfrute de la plataforma.</p>
                
                <h2>2. Contenido del Usuario</h2>
                <p>Al subir imágenes, mantienes todos los derechos de propiedad intelectual sobre tu contenido, pero nos otorgas una licencia para mostrarlo y distribuirlo dentro de la plataforma.</p>
                
                <h2>3. Privacidad</h2>
                <p>El uso de tus datos personales está sujeto a nuestra Política de Privacidad. Nos comprometemos a proteger tu información y no compartirla sin tu consentimiento.</p>
                
                <h2>4. Modificaciones</h2>
                <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en esta página.</p>
                
                <Link to="/" className="boton-volver">Volver al inicio</Link>
            </div>
        </div>
    );
}