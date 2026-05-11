# Info o projekte:
- Meno a priezvisko: Andrej Lukáčik
- Názov projektu: Plánovač programu
- Link na repozitár: https://github.com/AdoLuk/TIA-project
- Link na verejnú inštanciu projektu: https://tia-project-5lqg.onrender.com

# Info o reportovanej verzii:
- Tag: final    <!-- Uviesť final_cisloSubverzie, ak ste robili vo finálnej verzii zmeny pred termínom odovzdania -->

# Info k testovaniu:     
- meno: sampleUser123
- heslo: password123
<!-- su tam aj dalsi 2 useri, no vsetko potrebne by sa malo dat otestovat z jedneho, principialne to je to iste, no ak treba, tak doplnim udaje, ale hash hesla v db su len nieco vymyslene, takze budem musiet zmenit v db -->

# Postup, ako rozbehať vývojové prostredie 
- potrebný Node.js a npm
- v adresári program-planner-be (aj -fe to isté) spustiť "npm install"
- vytvoriť vlastnú databázu a spustiť v nej script z migrations/schema/tables.sql
- nastaviť vlastný .env súbor v koreňovom adresári backendu s premennými DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT, SESSION_SECRET, STATUS
- v adresári program-planner-be (aj -fe to isté) spustiť "npm run dev"

# Stav implementácie:
- nie je implementovane priradzovanie blokov <!-- myslel som ze doplnim ale uz som na to nemal kapacitu -->

# Retrospektíva:
<!-- Keby ste to robili znovu, čo by ste urobili inak? -->
- zameral by som sa viac na funkcionality zo specifikacie
<!-- Ste hrdý na výsledky svojej práce? Ktorý aspekt projektu je podľa Vás najviac kvalitný? -->
- nie je to zle, mohlo byt aj lepsie ale vpodstate tam chybaju drobne upravy a moze sa to otestovat v praxi



