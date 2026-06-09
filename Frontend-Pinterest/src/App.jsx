import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Comments from './components/Comments';

function App() {
  const [page, setPage] = useState('home');
  const [selectedImage, setSelectedImage] = useState(null);

  switch (page) {
    case 'login':
      return <Login setPage={setPage} />;
    case 'register':
      return <Register setPage={setPage} />;
    case 'profile':
      return <Profile setPage={setPage} setSelectedImage={setSelectedImage} />;
    case 'comments':
      return <Comments setPage={setPage} selectedImage={selectedImage} />;
    case 'home':
    default:
      return <Home setPage={setPage} setSelectedImage={setSelectedImage} />;
  }
}

export default App;
