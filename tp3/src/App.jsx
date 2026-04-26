import { useState, useEffect } from 'react';
import { loadAlumnos } from './services/alumnos';
import { cmpNombre, includesContact } from './utils/text';
import ContactCard from './components/ContactCard';
import Topbar from './components/Topbar';
import './App.css';
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
  
  const favorites = filtered.filter(c => c.favorito).sort(cmpNombre);
  const others = filtered.filter(c => !c.favorito).sort(cmpNombre);

  return (
    <div className="app-container">
      {/* Aquí irán los componentes */}
      <Topbar
        query={searchQuery}
        onSearch={setSearchQuery}
      />
      
      <div className='app-container'>
        <div className='main-content'>
          <p className='results-count'>
            Resultados: {filtered.length}
          </p>
          {/* Sección de Favoritos */}
          {favorites.length > 0 && (
            <section className='contacts-section'>
              <h2>
                Favoritos ({favorites.length})
              </h2>
              <div className='contacts-grid'> {/* Grilla interna */}
                {favorites.map(contact => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </section>
          )}
          
          {/* Sección del Resto */}
          <section className='contacts-section'>
            <h2>
              Contactos
            </h2>
            <div className='contacts-grid'> {/* Grilla interna */}
              {others.length > 0 ? (
                others.map(contact => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    onToggleFavorite={toggleFavorite}
                  />
                ))
              ) : (
                  <p>
                    No se encontraron alumnos.
                  </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App
