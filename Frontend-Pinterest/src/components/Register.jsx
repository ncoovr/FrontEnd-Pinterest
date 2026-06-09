import { useEffect, useState } from 'react';

export default function Register({ setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [birthdate, setBirthdate] = useState('');

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/reg.css';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simply redirect to login page upon form submission
    setPage('login');
  };

  return (
    <main className="container">
      <header className="header-brand">
        <figure className="logo" onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
          <span role="img" aria-label="Logo Pinterest">🐐</span>
        </figure>
        <h1 onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>Te damos la bienvenida a esta web page</h1>
        <p>Encuentra nuevas ideas para experimentar</p>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Correo electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <div className="password-wrapper">
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              placeholder="Crea una contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <button 
              type="button" 
              className="toggle-password" 
              aria-label="Mostrar u ocultar contraseña"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁️
            </button>
          </div>
          <small className="helper-text">Usa ocho o más letras, números y símbolos</small>
        </div>
        <div className="form-group">
          <label htmlFor="birthdate">Fecha de nacimiento</label>
          <input 
            type="date" 
            id="birthdate" 
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="btn-submit">Continuar</button>
      </form>
      <footer className="form-footer">
        <p className="login-redirect">
          ¿Ya eres miembro? <a href="#" onClick={(e) => { e.preventDefault(); setPage('login'); }}>Iniciar sesión</a>
        </p>
      </footer>
    </main>
  );
}
