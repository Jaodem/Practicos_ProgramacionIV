import { prompt, write, read } from "./io.js";

class Contact {
  constructor({
    id = null,
    firstName = '',
    lastName = '',
    age = 0,
    phone = '',
    email = ''
  } = {}) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.phone = phone;
    this.email = email;
  }
  
  // Devuelve una cadena con formato de tabla
  toString() {
    const idStr = String(this.id ?? '').padStart(2, '0');
    
    const fullName = `${this.lastName}, ${this.firstName}`.padEnd(22);
    const ageStr = String(this.age).padEnd(4);
    const phoneStr = String(this.phone || '').padEnd(14);
    
    return `${idStr} ${fullName} ${ageStr} ${phoneStr} ${this.email}`;
  }
  
  // Muestra los datos de forma detallada
  displayData() {
    console.log(`ID       : ${this.id}`);
    console.log(`Name     : ${this.firstName}`);
    console.log(`Last Name: ${this.lastName}`);
    console.log(`Age      : ${this.age}`);
    console.log(`Phone    : ${this.phone}`);
    console.log(`Email    : ${this.email}`);
  }
}

class Phonebook {
  constructor(
    contacts = [],
    lastId = 0
  ) {
    this.contacts = contacts;
    this.lastId = lastId;
  }
  
  addContact(contact) {
    this.lastId++;
    contact.id = this.lastId;
    this.contacts.push(contact);
  }
  
  list() {
    return [...this.contacts].sort((a, b) => {
      // Comparo los apellidos
      const lastCompare = a.lastName.localeCompare(b.lastName);
      
      // Si los apellidos son distintos devuelvo ese resultado
      if (lastCompare !== 0) return lastCompare;
      
      // Si son iguales, comparo por nombres
      return a.firstName.localeCompare(b.firstName);
    });
  }
  
  async save() {
    const data = JSON.stringify(
      {
        lastId: this.lastId,
        contacts: this.contacts
      }, null, 2
    );
    await write(data);
  }
  
  static async load() {
    try {
      const jsonString = await read();
      const data = JSON.parse(jsonString);
      const contacts = (data.contacts ?? []).map(c => new Contact(c));
      return new Phonebook(contacts, data.lastId ?? 0);
    } catch {
      return new Phonebook();
    }
  }
  
  find(text) {
    const query = text.toLowerCase();
    return this.contacts.filter(c =>
      c.firstName.toLowerCase().includes(query) ||
      c.lastName.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      String(c.phone).toLowerCase().includes(query)
    );
  }
  
  findById(id) {
    const foundContact = this.contacts.find(c => c.id == id);
    return foundContact;
  }
  
  delete(id) {
    const idx = this.contacts.findIndex(c => c.id == id);
    
    if (idx >= 0) {
      this.contacts.splice(idx, 1);
      return true;
    }
    return false;
  }
  
  update(id, data) {
    const foundContact = this.findById(id);
    
    if (foundContact) {
      Object.assign(foundContact, data);
      return true;
    }
    
    return false;
  }
}

async function menu() {
  let phonebook = await Phonebook.load();
  
  while (true) {
    console.clear();
    console.clear();
    console.log("╔══════════════════════════════════════╗");
    console.log("║         AGENDA DE CONTACTOS          ║");
    console.log("╠══════════════════════════════════════║");
    console.log("║ 1.  Listar contactos                 ║");
    console.log("║ 2.  Agregar contacto                 ║");
    console.log("║ 3.  Editar contacto                  ║");
    console.log("║ 4.  Borrar contacto                  ║");
    console.log("║ 5.  Buscar contacto por Contenido    ║");
    console.log("║ 0.  Salir                            ║");
    console.log("╚══════════════════════════════════════╝");
    const option = await prompt("\nSeleccione una opción (0 - 5): ");
    console.log("─────────────────────────────────────────────");
    switch (option) {
      case "1":
        console.log("\n=== Lista de Contactos ===");
        console.log("ID Nombre Completo        Edad  Teléfono        Email");
        console.log("-- ---------------------  ----  --------------  -------------------");
        phonebook.list().forEach(c => console.log(c.toString()));
        await prompt("\nPresioná enter para continuar...");
        break;
      
      case "2":
        {
          console.log("\n=== Agregar Contacto ===");
          const firstName = await prompt("Nombre  : ");
          const lastName = await prompt("Apellido : ");
          
          if (!firstName && !lastName) console.log("Error: El contacto debe tener al menos un nombre o apellido.");
          else {
            const age = await prompt("Edad  : ");
            const phone = await prompt("Teléfono  : ");
            const email = await prompt("Email : ");
            
            const contact = new Contact({
              firstName,
              lastName,
              age: parseInt(age) || 0,
              phone,
              email
            });
            phonebook.addContact(contact);
            await phonebook.save();
            console.log("✅ Contacto agregado correctamente.");
          }
        }
        await prompt("\nPresioná enter para continuar...");
        break;
      
      case "3":
        const idEdit = await prompt("ID a editar: ");
        const contact = phonebook.findById(idEdit);
        
        if (!contact) console.log("ID no encontrado.");
        else {
          console.log("Editando:");
          contact.displayData();
          
          const firstName = await prompt("Nombre  : ");
          const lastName = await prompt("Apellido : ");
          const age = await prompt("Edad  : ");
          const phone = await prompt("Teléfono  : ");
          const email = await prompt("Email : ");
          
          phonebook.update(idEdit, {
            firstName: firstName || contact.firstName,
            lastName: lastName || contact.lastName,
            age: parseInt(age) || contact.age,
            phone: phone || contact.phone,
            email: email || contact.email
          });
          
          await phonebook.save();
          console.log("Contacto editado correctamente.");
        }
        
        await prompt("\nPresioná enter para continuar...");
        break;
      
      case "4":
        const idDel = await prompt("ID a borrar: ");
        const deleted = phonebook.findById(idDel);
        
        if (deleted) {
          console.log("Contacto a borrar.");
          deleted.displayData();
          const confirm = await prompt("¿Estás seguro que querés borrar este contacto? (s/n): ");
          
          if (confirm.trim().toLowerCase() === "s") {
            phonebook.delete(idDel);
            await phonebook.save();
            console.log("Contacto borrado exitosamente.");
          } else console.log("Operación cancelada.");
        } else console.log("ID no encontrado.");
        await prompt("\nPresioná enter para continuar...");
        break;
      
      case "5":
        const query = await prompt("Buscar: ");
        const foundContact = phonebook.find(query);
        
        if (foundContact.length > 0) {
          console.log("Resultados encontrados:");
          foundContact.forEach(c => {
            c.displayData();
            console.log("----------------------------");
          });
        } else {
          console.log("No se encontraron contactos.");
        }
        await prompt("\nPresioná enter para continuar...");
        break;
      
      case "0":
        console.log("Saliendo...");
        return;
      
      default:
        console.log("Opción inválida.");
        await prompt("\nPresioná enter para continura...");
    }
  }
}

menu();