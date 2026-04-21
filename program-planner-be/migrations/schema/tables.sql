DROP TABLE users;
DROP TABLE blocks;


CREATE TABLE "public"."users" (
    "user_id" varchar(100) NOT NULL,
    "team_member_id" varchar(100) NOT NULL,
    "username" varchar(100) NOT NULL, --email
    "password" varchar(100) NOT NULL,
    PRIMARY KEY ("user_id")
);

CREATE TABLE "public"."blocks" (
    "block_id" integer NOT NULL,
    "event_id" integer NOT NULL,
    "title" varchar(100) NOT NULL,
    "place" varchar(100) NOT NULL,
    "begin_time" varchar(15) NOT NULL,
    "end_time" varchar(15) NOT NULL,
    "description" text NOT NULL,
    PRIMARY KEY ("block_id")
);

INSERT INTO blocks (block_id, event_id, title, place, begin_time, end_time, description) VALUES
(1, 1, 'Koncert 123', 'Hlavné pódium', '8:00', '10:00',
'Akustické vystúpenie lokálnej indie kapely v intímnom prostredí, vhodné pre všetky vekové skupiny, s miestami na sedenie aj státie, predaj nápojov pri vstupe. Začiatok 20:00, dĺžka ~90 min, vstup voľný.'),
(2, 2, 'Workshop 123', 'Tvorivá dielňa', '10:00', '12:00',
'"Umenie recyklovanej tvorby": interaktívna 60-minútová hodina s limitovaným počtom miest, praktické ukážky výroby doplnkov z recyklovaných materiálov, materiál zabezpečený, lektor k dispozícii, vhodné pre začiatočníkov i pokročilých.'),
(3, 3, 'Obed 123', 'Gastronomická zóna', '12:00', '13:00',
'pokojná atmosféra pri spoločnom sedení, krátke servírovanie, rýchla obsluha, vhodné pre rodiny i skupiny, stolovanie v priestoroch festivalu s výhľadom na hlavné pódium.');

INSERT INTO users (user_id, team_member_id, username, password) VALUES
    ('sampleUser123', 'sampleMember123', 'sampleUser123', '$2b$10$M1sjdx1mfOnDr28uSRiaLe9gB5UYWan9t5Ogi2FP2/1SoJVGn5viS');
COMMIT;
