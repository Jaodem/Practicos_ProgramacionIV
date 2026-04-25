export const norm = (str = '') => {
  return str
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export const cmpNombre = (a, b) => {
  const nameA = norm(a.nombre || '');
  const nameB = norm(b.nombre || '');
  return nameA.localeCompare(nameB);
};

export const includesContact = (student, query) => {
  const q = norm(String(query));
  
  return (
    norm(student.nombre).includes(q) ||
    norm(student.telefono).includes(q) ||
    norm(student.legajo).includes(q)
  );
};