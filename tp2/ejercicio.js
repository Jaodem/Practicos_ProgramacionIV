class Contact {
  constructor(id, firstName, lastName, phone, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
  }
}

class Agenda {
  #contacts = [];

  constructor() {
    this.#contacts = [];
  }

  add(data) {
    const id = String(Date.now() + Math.floor(Math.random() * 1000));
    const newContact = new Contact(
      id,
      data.firstName,
      data.lastName,
      data.phone,
      data.email,
    );

    this.#contacts.push(newContact);
    this.#sort();
    return newContact;
  }

  #sort() {
    this.#contacts.sort((a, b) => {
      return (
        a.lastName.localeCompare(b.lastName, "es") ||
        a.firstName.localeCompare(b.firstName, "es")
      );
    });
  }

  get all() {
    return [...this.#contacts];
  }
  
  find(query) {
    const cleanQuery = normalizerText(query);
    if (!cleanQuery) return this.all; // Si no hay búsqueda, devuelve todos
    
    return this.#contacts.filter(contact => {
      // Se busca en todos los campos relevantes
      const searchFields = [
        contact.firstName,
        contact.lastName,
        contact.phone,
        contact.email
      ];
      
      return searchFields.some(field =>
        normalizerText(field).includes(cleanQuery)
      );
    });
  }
  
  delete(id) {
    this.#contacts = this.#contacts.filter(c => String(c.id) !== String(id));
  }
  
  update(id, data) {
    const index = this.#contacts.findIndex(c => String(c.id) === String(id));
    if (index !== -1) {
      this.#contacts[index] = new Contact(
        id,
        data.firstName,
        data.lastName,
        data.phone,
        data.email
      );
      this.#sort();
    }
  }
}

// Función para limpiar el texto para comparaciones (normalizar)
const normalizerText = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD") // Separa el acento de la letra
    .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
    .trim();
};

const INITIAL_CONTACTS = [
  { firstName: "Ana", lastName: "García", phone: "381 555-1001", email: "ana.garcia@mail.com" },
  { firstName: "José", lastName: "Muñoz", phone: "381 555-1002", email: "jose.munoz@mail.com" },
  { firstName: "Lucía", lastName: "Pérez", phone: "381 555-1003", email: "lucia.perez@mail.com" },
  { firstName: "Martín", lastName: "Gómez", phone: "381 555-1004", email: "martin.gomez@mail.com" },
  { firstName: "Sofía", lastName: "Díaz", phone: "381 555-1005", email: "sofia.diaz@mail.com" },
  { firstName: "Andrés", lastName: "Núñez", phone: "381 555-1006", email: "andres.nunez@mail.com" },
  { firstName: "Camila", lastName: "Rodríguez", phone: "381 555-1007", email: "camila.rodriguez@mail.com" },
  { firstName: "Nicolás", lastName: "Álvarez", phone: "381 555-1008", email: "nicolas.alvarez@mail.com" },
  { firstName: "Valentina", lastName: "Sánchez", phone: "381 555-1009", email: "valentina.sanchez@mail.com" },
  { firstName: "Diego", lastName: "Fernández", phone: "381 555-1010", email: "diego.fernandez@mail.com" }
];

document.addEventListener("DOMContentLoaded", () => {
  // Se capturan los elementos del DOM
  const addBtn = document.getElementById("add-contact-btn");
  const contactDialog = document.getElementById("contact-dialog");
  const cancelBtn = document.getElementById("cancel-btn");
  
  const agenda = new Agenda();
  const contactList = document.getElementById('contact-list');
  
  const contactForm = document.getElementById('contact-form');
  
  const searchInput = document.getElementById('search-input');
  
  // Se cargan los contactos iniciales en la lógica.
  INITIAL_CONTACTS.forEach(data => agenda.add(data));
  
  // Función de renderizado: Borra la lista actual y la vuelve a dibujar
  // Transforma objetos JS en elementos HTML
  const render = (contacts = agenda.all) => {
    contactList.innerHTML = ''; // Se limpia la pantalla
    
    contacts.forEach(contact => {
      const article = document.createElement('article');
      // Se usa Template Literals para armar la tarjeta
      article.innerHTML = `
        <header>
          <strong>${contact.lastName.toUpperCase()}, ${contact.firstName}</strong>
        </header>
        <p>📞 ${contact.phone}</p>
        <p>📧 ${contact.email}</p>
        <footer class="grid">
          <button class="outline" data-id="${contact.id}">✏️</button>
          <button class="outline contrast" data-id="${contact.id}">🗑️</button>
        </footer>
      `;
      contactList.appendChild(article);
    });
  };
  
  // Se llama a render
  render();
  
  searchInput.addEventListener('input', (event) => {
    const query = event.target.value;
    const filteredResults = agenda.find(query);
    
    // Se usa el render que ya estaba, pero con los resultados filtrados
    render(filteredResults);
  })

  // Evento para abrir el modal
  addBtn.addEventListener("click", () => {
    document.getElementById('contact-id').value = "";
    document.getElementById('dialog-title').innerText = "Nuevo Contacto";
    contactForm.reset();
    contactDialog.showModal();
  });
  
  // Evento cuando se envía el formulario
  contactForm.addEventListener('submit', (event) => {
    // Se evita que la página se recargue
    event.preventDefault();
    
    // Se captura el ID del campo oculto
    const id = document.getElementById('contact-id').value;
    
    // Se capturan los datos usando FOrmData
    const formData = new FormData(contactForm);
    
    // Se prepara el objeto con la nomenclatura que espera la clase
    const contactData = {
      firstName: formData.get('first-name'),
      lastName: formData.get('last-name'),
      phone: formData.get('phone'),
      email: formData.get('email')
    };
    
    if (id) {
      // Si hay un ID se llama al método actualizar
      agenda.update(id, contactData);
    } else {
      // Si no hay ID, es porque el usuario apretó "Agregar"
      agenda.add(contactData);
    }
    
    // Se limpia total
    contactForm.reset();
    document.getElementById('contact-id').value = ""; // Se vacía el ID
    document.getElementById('dialog-title').innerText = "Nuevo Contacto"; // Se resetea el título
    contactDialog.close();
    
    // Se vuelve a dibujar la lista completa
    render();
  });

  // Evento para cerrar el modal
  cancelBtn.addEventListener("click", () => {
    contactDialog.close();
  });
  
  contactList.addEventListener('click', (e) => {
    // Se identifica que botón se presionó
    const btn = e.target.closest('button');
    
    if (!btn) return; // Si no se toca un botón no se hace nada
    
    const id = btn.dataset.id;
    
    // Si el botón tiene la clase 'contrast', es el de borrar
    if (btn.classList.contains('contrast')) {
      if (confirm("¿Seguro que querés borrar este contacto?")) {
        agenda.delete(id);
        render();
      }
    } else {
      const contact = agenda.all.find(c => String(c.id) === String(id));
      if (contact) {
        // Se cargan los datos en el formulario
        document.getElementById('contact-id').value = contact.id;
        document.getElementById('first-name').value = contact.firstName;
        document.getElementById('last-name').value = contact.lastName;
        document.getElementById('phone').value = contact.phone;
        document.getElementById('email').value = contact.email;
        
        document.getElementById('dialog-title').innerText = "Editar Contacto";
        contactDialog.showModal();
      }
    }
  });
});
