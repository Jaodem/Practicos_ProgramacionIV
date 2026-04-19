import { prompt } from "./io.js";

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
    console.log(`ID       : ${this.lastName}`);
    console.log(`Name     : ${this.lastName}`);
    console.log(`Last Name: ${this.lastName}`);
    console.log(`Age      : ${this.lastName}`);
    console.log(`Phone    : ${this.lastName}`);
    console.log(`Email    : ${this.lastName}`);
  }
}