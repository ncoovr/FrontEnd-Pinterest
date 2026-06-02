const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

if (loginForm) {
    loginForm.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
            //de momento solo imprimo en consola para ver si funciona
            //porque no tengo la API en esta rama, pero aquí es donde haría la llamada a la API para iniciar sesión
        console.log("Iniciando sesión...");
        console.log("Email: ", email);
        console.log("Password: ", password);
    });
}

if(registerForm) {
    registerForm.addEventListener('submit', function(evento) {
        evento.preventDefault();
    
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const birthdate = document.getElementById('birthdate').value;

        console.log("Registro existoso...");
        console.log("Email: ", email);
        console.log("Password: ", password);
        console.log("BitthDate: ", birthdate);

    });

}

