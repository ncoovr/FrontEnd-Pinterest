import { useEffect, useState } from 'react';

export default function Login({ setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/log.css';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simply redirect to home page upon form submission
    setPage('home');
  };

  return (
    <main className="login-container">
      <header className="header-brand">
        <figure className="logo" onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
          <span role="img" aria-label="Logo Pinterest">🐐</span>
        </figure>
        <h1 onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>Te damos la bienvenida a esta web page</h1>
        <p>Introduce tus credenciales para ingresar</p>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login-email">Correo Electrónico</label>
          <input 
            type="email" 
            id="login-email" 
            placeholder="Correo Electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Contraseña</label>
          <div className="password-wrapper">
            <input 
              type={showPassword ? "text" : "password"} 
              id="login-password" 
              placeholder="Introduce tu contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <button 
              type="button" 
              className="toggle-password" 
              aria-label="Mostrar u ocultar tu contraseña"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁️
            </button>
          </div>
          <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>¿Olvidaste tu contraseña?</a>
        </div>

        <button type="submit" className="btn-submit">Iniciar Sesión</button>
      </form>
      <footer class="form-footer">
        <p className="register-redirect">
          ¿Aún no estás en la web? <a href="#" onClick={(e) => { e.preventDefault(); setPage('register'); }}>Regístrate</a>
        </p>
      </footer>
    </main>
  );
}
