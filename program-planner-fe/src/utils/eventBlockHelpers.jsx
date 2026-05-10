
const normalize = s => s
    .normalize('NFD')               // rozloží písmená + diakritiku
    .replace(/[\u0300-\u036f]/g, '')// odstráni diakritické znaky
    .toLowerCase();

function isSubstr(word, string) {
  return normalize(string).includes(normalize(word));
}

function dateFromString(s) {
  let d = new Date(s);
  // return String(d.get()).padStart(2, "0") + "." + String(d.getMonth()).padStart(2, "0") + "." + d.getFullYear();
  return s.split('T')[0].split('-').reverse().join('.');
}

function stringFromDate(d, old_s) {
  return new Date(d.split(".").reverse().join("-") + "T" + old_s.split("T")[1]);
}

function timeFromString(s) {
  return s.split(":").slice(0, 2).join(":");
}

export { isSubstr, dateFromString, stringFromDate, timeFromString };