import { useEffect, useState } from 'react';

export default function Home({ setPage, setSelectedImage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/style.css';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const images = [
    "https://images.pexels.com/photos/9329047/pexels-photo-9329047.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/9221307/pexels-photo-9221307.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1666667/pexels-photo-1666667.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/36770103/pexels-photo-36770103.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/30150825/pexels-photo-30150825.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/35719467/pexels-photo-35719467.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/15988007/pexels-photo-15988007.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/12379827/pexels-photo-12379827.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3724836/pexels-photo-3724836.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/15320566/pexels-photo-15320566.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/35101544/pexels-photo-35101544.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/7513474/pexels-photo-7513474.jpeg?auto=compress&cs=tinysrgb&w=600"
  ];

  return (
    <div>
      <header className="encabezado">
        <nav className="navegacion-superior">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); setPage('home'); }}>
            <img src="/assets/images/pinterest-logo.webp" alt="Logo de Pinterest" className="imagen-logo" />
            <span className="texto-logo">Pinterest</span>
          </a>
          
          <menu className="menu-derecho" style={{ position: 'relative' }}>
            <span className="icono-nav" onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer' }}>…</span>
            <a href="#" onClick={(e) => { e.preventDefault(); setPage('profile'); }}>
              <img src="/assets/images/perfil.webp" alt="Perfil" className="avatar-nav" />
            </a>

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
                <a href="#" style={{ color: '#333', textDecoration: 'none', fontSize: '14px' }} onClick={(e) => { e.preventDefault(); setPage('login'); setMenuOpen(false); }}>Iniciar Sesión</a>
                <a href="#" style={{ color: '#333', textDecoration: 'none', fontSize: '14px' }} onClick={(e) => { e.preventDefault(); setPage('register'); setMenuOpen(false); }}>Registrarse</a>
              </div>
            )}
          </menu>
        </nav>

        <nav className="navegacion-central">
          <a href="#" className="activo" onClick={(e) => { e.preventDefault(); setPage('home'); }}>Inicio</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Videos</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Galería</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setPage('profile'); }}>Perfil</a>
        </nav>
      </header>

      <main>
        <section className="seccion-hero">
          <article className="contenido-hero">
            <h1>Las mejores fotos del mundo mundial, imágenes inventadas para esta preiosa entrega.</h1>
            
            <form className="barra-busqueda" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Busca lo que gustes.." />
              <button type="submit" className="boton-busqueda">🔍</button>
            </form>
          </article>
        </section>

        <section className="seccion-tendencias">
          <header className="cabecera-tendencias">
            <h2>Galería</h2>
            <button className="boton-tendencia">Categorías ▾</button>
          </header>
          
          <nav className="contenedor-etiquetas">
            <button className="etiqueta"><span className="imagen-etiqueta" style={{ backgroundImage: "url('https://images.pexels.com/photos/9329047/pexels-photo-9329047.jpeg?auto=compress&cs=tinysrgb&w=100')" }}></span> Besucon <span>15.4K</span></button>
            <button className="etiqueta"><span class="imagen-etiqueta" style={{ backgroundImage: "url('https://images.pexels.com/photos/9221307/pexels-photo-9221307.jpeg?auto=compress&cs=tinysrgb&w=100')" }}></span> Tigre  <span>503.3K</span></button>
            <button className="etiqueta"><span class="imagen-etiqueta" style={{ backgroundImage: "url('https://images.pexels.com/photos/1666667/pexels-photo-1666667.jpeg?auto=compress&cs=tinysrgb&w=100')" }}></span> Cachorra <span>240.8K</span></button>
            <button className="etiqueta"><span class="imagen-etiqueta" style={{ backgroundImage: "url('https://images.pexels.com/photos/36770103/pexels-photo-36770103.jpeg?auto=compress&cs=tinysrgb&w=100')" }}></span> Chonerito <span>1.7M</span></button>
            <button className="etiqueta"><span class="imagen-etiqueta" style={{ backgroundImage: "url('https://images.pexels.com/photos/30150825/pexels-photo-30150825.jpeg?auto=compress&cs=tinysrgb&w=100')" }}></span> Flaquito <span>410.7K</span></button>
          </nav>
        </section>

        <section className="cuadricula-galeria">
          {images.map((src, index) => (
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
