import { useEffect, useState } from 'react';

export default function Profile({ setPage, setSelectedImage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Andrés Velasco');
  const [bio, setBio] = useState('Estudiante de Ingeniería en Sistemas. Apasionado por la la carreara, el desarrollo en Java y el aprendizaje autonomo.');

  useEffect(() => {
    // Load style.css
    const linkStyle = document.createElement('link');
    linkStyle.rel = 'stylesheet';
    linkStyle.href = '/assets/style.css';
    document.head.appendChild(linkStyle);

    // Load prof.css
    const linkProf = document.createElement('link');
    linkProf.rel = 'stylesheet';
    linkProf.href = '/assets/prof.css';
    document.head.appendChild(linkProf);

    return () => {
      document.head.removeChild(linkStyle);
      document.head.removeChild(linkProf);
    };
  }, []);

  const galleryImages = [
    "https://images.pexels.com/photos/12379827/pexels-photo-12379827.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3724836/pexels-photo-3724836.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/15320566/pexels-photo-15320566.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/35101544/pexels-photo-35101544.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/7513474/pexels-photo-7513474.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/5466870/pexels-photo-5466870.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/9329047/pexels-photo-9329047.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1666667/pexels-photo-1666667.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/30150825/pexels-photo-30150825.jpeg?auto=compress&cs=tinysrgb&w=600"
  ];

  return (
    <div>
      <header className="encabezado encabezado-borde">
        <nav className="navegacion-perfil">
          <article className="nav-izquierda">
            <a href="#" className="logo" onClick={(e) => { e.preventDefault(); setPage('home'); }}>
              <img src="/assets/images/pinterest-logo.webp" alt="Logo de Pinterest" className="imagen-logo" />
              <span className="texto-logo">Pinterest</span>
            </a>
            
            <form className="barra-busqueda-perfil" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Busca lo que gustes.." />
              <button type="submit" className="boton-lupa">🔍</button>
            </form>
          </article>
          
          <menu className="nav-derecha" style={{ position: 'relative' }}>
            <span className="icono-nav" onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer' }}>…</span>
            <img src="/assets/images/perfil.webp" alt="Perfil" className="avatar-nav" style={{ cursor: 'pointer' }} onClick={() => setPage('profile')} />

            {menuOpen && (
              <div style={{
                position: 'absolute',
                top: '40px',
                right: '0',
                backgroundColor: '#ffffff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                minWidth: '120px'
              }}>
                <a href="#" style={{ color: '#333', textDecoration: 'none', fontSize: '14px' }} onClick={(e) => { e.preventDefault(); setPage('home'); setMenuOpen(false); }}>Inicio</a>
                <a href="#" style={{ color: '#333', textDecoration: 'none', fontSize: '14px' }} onClick={(e) => { e.preventDefault(); setPage('login'); setMenuOpen(false); }}>Iniciar Sesión</a>
                <a href="#" style={{ color: '#333', textDecoration: 'none', fontSize: '14px' }} onClick={(e) => { e.preventDefault(); setPage('register'); setMenuOpen(false); }}>Registrarse</a>
              </div>
            )}
          </menu>
        </nav>
      </header>

      <main className="pagina-perfil">
        <section className="cabecera-perfil">
          <article className="tarjeta-usuario">
            <img src="/assets/images/perfil.webp" alt="Andrés Velasco" className="avatar-principal" />
            <div className="informacion-usuario">
              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    style={{ fontSize: '24px', fontWeight: 'bold', border: '1px solid #ccc', borderRadius: '4px', padding: '4px' }}
                  />
                  <textarea 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    style={{ fontSize: '14px', fontFamily: 'inherit', border: '1px solid #ccc', borderRadius: '4px', padding: '4px', width: '100%', minHeight: '60px' }}
                  />
                </div>
              ) : (
                <>
                  <h1 className="nombre-perfil">{name}</h1>
                  <p className="bio-perfil">{bio}</p>
                </>
              )}
            </div>
          </article>
          <button className="boton-editar" onClick={() => setIsEditing(!isEditing)}>
            ✎ {isEditing ? 'Guardar' : 'Editar perfil'}
          </button>
        </section>

        <section className="seccion-pestanas">
          <nav className="pestanas-izquierda">
            <a href="#" className="enlace-pestana" onClick={(e) => e.preventDefault()}>Destacados <span>0</span></a>
            <a href="#" className="enlace-pestana activo" onClick={(e) => e.preventDefault()}>Galería <span>{galleryImages.length}</span></a>
            <a href="#" className="enlace-pestana" onClick={(e) => e.preventDefault()}>Colecciones</a>
          </nav>
          
          <menu className="filtros-derecha">
            <button className="boton-filtro deshabilitado" disabled>Añadir a destacados</button>
            <button className="boton-filtro" onClick={(e) => e.preventDefault()}>Fotos y videos ▾</button>
            <button className="boton-filtro" onClick={(e) => e.preventDefault()}>Favoritos ▾</button>
          </menu>
        </section>

        <section className="cuadricula-galeria">
          {galleryImages.map((src, index) => (
            <img 
              key={index} 
              src={src} 
              alt="Galería" 
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setSelectedImage(src);
                setPage('comments');
              }}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
