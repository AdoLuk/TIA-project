# Info o projekte:
- Meno a priezvisko: Andrej Lukáčik
- Názov projektu: Plánovač programu
- Link na repozitár: https://github.com/AdoLuk/TIA-project
- Link na verejnú inštanciu projektu: https://tia-project-5lqg.onrender.com

# Info o reportovanej verzii:
- Tag: beta    <!-- Uviesť beta_cisloSubverzie, ak ste robili v bete zmeny pred termínom odovzdania -->

# Info k testovaniu:
- meno: sampleUser123
- heslo: password123

# Postup, ako rozbehať vývojové prostredie
- potrebný Node.js a npm
- v adresári program-planner-be (aj -fe to isté) spustiť "npm install"
- vytvoriť vlastnú databázu a spustiť v nej script z migrations/schema/tables.sql
- nastaviť vlastný .env súbor v koreňovom adresári backendu s premennými DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT, SESSION_SECRET, STATUS
- v adresári program-planner-be (aj -fe to isté) spustiť "npm run dev"

# Stav implementácie:
- funkčná autentifikácia
- autorizácia - zatiaľ len jednoduchá, t.j. prihlásený/odhlásený
- čítanie a úprava všetkých programových blokov

# Časový plán:
10. týždeň (20.4.-26.4.) - priradzovanie programových blokov členom
11. týždeň (27.4.-3.5.) - zápis členmi tímu do "mojich" blokov
12. týždeň (4.5.-10.5.) - triedenie a kopirovanie programových blokov, deployment finálnej verzie

# Problémy:
- žiadne


