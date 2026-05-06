
const normalize = s => s
    .normalize('NFD')               // rozloží písmená + diakritiku
    .replace(/[\u0300-\u036f]/g, '')// odstráni diakritické znaky
    .toLowerCase();

function isSubstr(word, string) {
  return normalize(string).includes(normalize(word));
}

export { isSubstr };