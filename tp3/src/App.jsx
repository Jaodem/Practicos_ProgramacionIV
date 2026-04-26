import { useState, useEffect } from 'react';
import { loadAlumnos } from './services/alumnos';
import { cmpNombre, includesContact } from './utils/text';
import heroImg from './assets/hero.png';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Carga inicial
  useEffect(() => {
    const data = loadAlumnos();
    setContacts(data);
  }, []);
  
  // Lógica de toggle favorito
  const toggleFavorite = (id) => {
    setContacts(prev => prev.map(c =>
      c.id === id ? { ...c, favorito: !c.favorito } : c
    ));
  };
  
  const filtered = contacts.filter(c => includesContact(c, searchQuery));
  
  const favoritos = filtered.filter(c => c.favorito).sort(cmpNombre);
  const others = filtered.filter(c => !c.favorito).sort(cmpNombre);

  return (
    <div className="app-container">
      {/* Aquí irán los componentes */}
      <h1>
        Directorio de Alumnos
      </h1>
      <input
        type='text'
        placeholder='Buscar...'
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <p>
        Resultados: {filtered.length}
      </p>
    </div>
  );
}

export default App
