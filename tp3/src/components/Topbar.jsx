import './Topbar.css';

const Topbar = ({ query, onSearch }) => {
  return (
    <header className="topbar">
      <div className="topbar-content">
        <h1>
          Directorio de Alumnos
        </h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por nombre, legajo o teléfono..."
            value={query}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Topbar;