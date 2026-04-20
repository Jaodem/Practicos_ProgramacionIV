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

document.addEventListener("DOMContentLoaded", () => {
  // Se capturan los elementos del DOM
  const addBtn = document.getElementById("add-contact-btn");
  const contactDialog = document.getElementById("contact-dialog");
  const cancelBtn = document.getElementById("cancel-btn");

  // Evento para abrir el modal
  addBtn.addEventListener("click", () => {
    contactDialog.showModal();
  });

  // Evento para cerrar el modal
  cancelBtn.addEventListener("click", () => {
    contactDialog.close();
  });
});
