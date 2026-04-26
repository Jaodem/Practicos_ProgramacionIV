import rawVcf from '../assets/alumnos.vcf?raw';

const REGEX_FN = /^FN:(.+)$/m;
const REGEX_TEL = /^TEL;TYPE=CELL:(.+)$/m;
const REGEX_LEGAJO = /Legajo:\s*(\d+)/i;
const REGEX_GITHUB = /GitHub:\s*([A-Za-z0-9-]+)/i;

const parseVcf = (vcfText) => {
  if (!vcfText) return [];
  
  return vcfText
    .split(/END:VCARD\s*/i)
    .filter(Boolean)
    .map((card) => {
      // Extraer los datos relevantes de cada tarjeta
      const fnMatch = card.match(REGEX_FN);
      const phoneMatch = card.match(REGEX_TEL);
      const legajoMatch = card.match(REGEX_LEGAJO);
      const githubMatch = card.match(REGEX_GITHUB);
      
      const legajo = legajoMatch ? legajoMatch[1] : '';
      
      return {
        id: legajo,
        nombre: fnMatch ? fnMatch[1].trim() : 'Sin nombre',
        telefono: phoneMatch ? phoneMatch[1].trim() : 'Sin teléfono',
        legajo: legajo,
        github: githubMatch ? githubMatch[1].trim() : '',
        favorito: false,
      };
    }).filter((alumno) => alumno.legajo);
};

export const loadAlumnos = () => {
  return parseVcf(rawVcf);
}