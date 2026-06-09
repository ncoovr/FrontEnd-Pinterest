import { useEffect, useState } from 'react';

export default function Comments({ setPage, selectedImage }) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Juan Báez",
      text: "Buena imagen, pero que tal si publican como reparar un skoda que esta casi dañado?",
      avatar: "🏌️",
      time: "Hace 1 día"
    },
    {
      id: 2,
      name: "Steven Cazar",
      text: "Hola acá se puede poner omfg?",
      avatar: "👤",
      time: "Hace 20 min"
    }
  ]);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/coms.css';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const addedComment = {
      id: Date.now(),
      name: "Andrés Velasco",
      text: newComment.trim(),
      avatar: "🐐",
      time: "Hace un momento"
    };

    setComments([...comments, addedComment]);
    setNewComment('');
  };

  // Fallback image if none selected
  const displayImage = selectedImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000";

  return (
    <main className="comments-container">
      <section className="pin-image-container">
        <img src={displayImage} alt="Imagen del Pin" className="main-pin-image" />
      </section>

      <section className="pin-details-side">
        <header className="comments-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>Comentarios</h2>
            <span className="comments-count">{comments.length} comentarios</span>
          </div>
          <button 
            type="button" 
            onClick={() => setPage('home')}
            style={{
              backgroundColor: '#efefef',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Volver al Inicio
          </button>
        </header>

        <section className="comments-list">
          {comments.map((comment) => (
            <article key={comment.id} className="comment-item">
              <figure className="user-avatar">
                <span role="img" aria-label={`Avatar de ${comment.name}`}>{comment.avatar}</span>
              </figure>
              <div className="comment-content">
                <h3>{comment.name}</h3>
                <p>{comment.text}</p>
                <time>{comment.time}</time>
              </div>
            </article>
          ))}
        </section>
        
        <footer className="add-comment-section">
          <form onSubmit={handleSubmit} className="comment-form">
            <figure className="current-user-avatar">
              <span role="img" aria-label="Tu Avatar">🐐</span>
            </figure>
            <div className="input-wrapper">
              <textarea 
                placeholder="Agrega un comentario" 
                rows="2" 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              ></textarea>
              <button type="submit" className="btn-send-comment">Enviar</button>
            </div>
          </form>
        </footer>
      </section>
    </main>
  );
}
