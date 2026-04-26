import './ContactCard.css';

const ContactCard = ({ contact, onToggleFavorite }) => {
  // Función para enmascarar el teléfono
  const maskPhone = (phone) => {
    if (!phone || phone === 'Sin teléfono') return phone;
    return phone.substring(0, 3) + 'X'.repeat(phone.length - 3);
  }
  // Se contruye la URL del avatar o una por defecto
  const avatarUrl = contact.github
    ? `https://github.com/${contact.github}.png?size=100`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.nombre)}&background=random`;
  
  return (
    <div className={`contact-card ${contact.favorito ? 'is-favorite' : ''}`}>
      <div className="card-header">
        <img src={avatarUrl} alt={contact.nombre} className="avatar" />
        <button
          className="fav-button"
          onClick={() => onToggleFavorite(contact.id)}
        >
          {contact.favorito ? '★' : '☆'}
        </button>
      </div>
      
      <div className="card-body">
        <h3>
          {contact.nombre}
        </h3>
        <p>
          <strong>Tel:</strong> {maskPhone(contact.telefono)}
        </p>
        <p>
          <strong>Legajo:</strong> {contact.legajo}
        </p>
      </div>
    </div>
  );
};

export default ContactCard;