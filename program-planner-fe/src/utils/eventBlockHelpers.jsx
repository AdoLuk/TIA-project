
const normalize = s => s
    .normalize('NFD')               // rozloží písmená + diakritiku
    .replace(/[\u0300-\u036f]/g, '')// odstráni diakritické znaky
    .toLowerCase();

function isSubstr(word, string) {
  return normalize(string).includes(normalize(word));
}

function dateFromString(s) {
  return s.split('-').reverse().join('.');
}

function stringFromDate(d, old_s) {
  return d.split(".").reverse().join("-");
}

function timeFromString(s) {
  return s.split(":").slice(0, 2).join(":");
}

export { isSubstr, dateFromString, stringFromDate, timeFromString };