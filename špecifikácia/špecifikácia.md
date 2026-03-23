# Špecifikácia - plánovač programu

Aplikácia plánovač programu pre organizácie bude zameraná na efektívne riadenie plánovacieho procesu veľkých akcii ako sú tábory alebo festivaly. Aplikácia je určená pre väčšie organizácie, ktoré pravidelne usporiadávajú veľké akcie náročné na program a celkový priebeh.


## Používateľské požiadavky

### Používateľské role:

- **Člen tímu:** Každý, kto sa bude podieľať na tvorbe programu.  
    >Funkcionalita: Člen tímu môže mať priradených niekoľko programových blokov. Tieto sú určené pre neho aby na nich pracoval ("update" - CRUD).  
    >Môže čítať všetky programové bloky ("read") .  
    >Môže sa prihlásiť/odhlásiť.
- **Vedúci bloku:** Je tiež členom tímu.  
    >Funkcionalita (*future work*): Navyše môže odosielať finálnu verziu bloku vedúcemu tímu na potvrdenie. (A ďaľšie...)
- **Vedúci tímu:** Má nastarosti program na celej akcii.
    >Funkcionalita: Môže vytvárať a editovať programové bloky a ich súčasti v mojich akciach (CRUD).  
    >Priradzuje programové bloky členom tímu

![UCD](use_case.svg)

<br>

## Dátový model

### ERD:

![ERD](datovy_model.svg)

### Popis entít:

- **ČLEN TÍMU:** 
    - Obsahuje zoznam členov (t.j. všetkých používateľov), ktorí sa podieľajú na tvorbe programu.
- **AKCIA:** 
    - Obsahuje zoznam akcii, ktoré sa už zorganizovali, alebo sa práve plánujú.
    - id_člena: referencia na člena, ktorý je vedúci tejto akcie. Vedúci je práve jeden. 
    - typ_akcie, názov: opisujú akciu
    - dátum_od, dátum_do: plánovaný  dátum začiatku a konca akcie
- **PROGRAMOVÝ BLOK:** 
    - Obsahuje vsetky programové bloky.
    - id_akcie: referencia na akciu, v ktorej sa nachádza tento blok.
    - typ_bloku, názov, ...ostatné stringy: opisujú daný blok. (Hlavne túto časť tvoria členovia tímu)
- **PRIRADENIE BLOKU:** 
    - Obsahuje tzv. priradenia, teda spája člena a blok many-to-many.
    - vedúci: true - daný člen je vedúcim bloku, inak nie. (Zatiaľ to nerobí rozdiel. Implementácia rozdielov zostáva na *future work*)
- **POUŽÍVATEĽSKÝ ÚČET:** 
    - Obsahuje zoznam účtov, ktoré sa používajú na autentifikáciu používateľov.
    - id_člena: referencia na člena, ktorému patrí účet.
    - email: prihlasovací email.
    - heslo: zahashované prihlasovacie heslo.


## Technologické požiadavky

- Client-side: React 18, JavaScript, HTML5, CSS3
- Server-side: node.js 20, JavaScript
- Databáza: PostgreSQL 18
- Interface client - server: Rest API
- Hosting: render.com
- Podporované prehliadače: Chrome, Firefox


## Časový plán

5. týždeň (16.3.-21.3.) - vypracovanie špecifikácie, nastavenie git-hub projektu
6. týždeň (22.3.-27.3.) - čítanie všetkých programových blokov, GUI
7. týždeň (28.3.-5.4.) - prihlasovanie/registrácia
8. týždeň (6.4.-12.4.) - pridavanie programových blokov veducimi timu
9. týždeň (13.4.-19.4.) - deployment beta verzie
10. týždeň (20.4.-26.4.) - priradzovanie programových blokov členom
11. týždeň (27.4.-3.5.) - zápis členmi tímu do blokov
12. týždeň (4.5.-10.5.) - triedenie a kopirovanie programových blokov, deployment finálnej verzie
