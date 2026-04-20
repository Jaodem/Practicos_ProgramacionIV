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
    const id = Date.now();
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
}

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
  
  const contactForm = document.getElementById('contact-form')
  
  // Se cargan los contactos iniciales en la lógica.
  INITIAL_CONTACTS.forEach(data => agenda.add(data));
  console.log("Contactos en agenda:", agenda.all);
  
  // Función de renderizado: Borra la lista actual y la vuelve a dibujar
  // Transforma objetos JS en elementos HTML
  const render = () => {
    contactList.innerHTML = ''; // Se limpia la pantalla
    
    agenda.all.forEach(contact => {
      const article = document.createElement('article');
      // Se usa Template Literals para armar la tarjeta
      article.innerHTML = `
        <header>
          <strong>${contact.lastName.toUpperCase()}, ${contact.firstName}</strong>
        </header>
        <p>📞 ${contact.phone}</p>
        <p>📧 ${contact.email}</p>
        <footer class="grid">
          <button class="outline" onclick="console.log('Editar', ${contact.id})">✏️</button>
          <button class="outline contrast" onclick="console.log('Borrar', ${contact.id})">🗑️</button>
        </footer>
      `;
      contactList.appendChild(article);
    });
  };
  
  // Se llama a render
  render();

  // Evento para abrir el modal
  addBtn.addEventListener("click", () => {
    contactDialog.showModal();
  });
  
  // Evento cuando se envía el formulario
  contactForm.addEventListener('submit', (event) => {
    // Se evita que la página se recargue
    event.preventDefault();
    
    // Se capturan los datos usando FOrmData
    const formData = new FormData(contactForm);
    
    // Se prepara el objeto con la nomenclatura que espera la clase
    const contactData = {
      firstName: formData.get('first-name'),
      lastName: formData.get('last-name'),
      phone: formData.get('phone'),
      email: formData.get('email')
    };
    
    // Se agrega el contacto
    agenda.add(contactData);
    
    // Se limpia el formulario y se cierra el modal
    contactForm.reset();
    contactDialog.close();
    
    // Se vuelve a dibujar la lista completa
    render();
  });

  // Evento para cerrar el modal
  cancelBtn.addEventListener("click", () => {
    contactDialog.close();
  });
});
