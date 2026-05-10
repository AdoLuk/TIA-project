DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS event_types CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS block_types CASCADE;
DROP TABLE IF EXISTS blocks CASCADE;
DROP TABLE IF EXISTS block_assignments;
DROP TABLE IF EXISTS session;


CREATE TABLE "public"."users" (
    "user_id" integer generated always as identity primary key,
    "team_member_id" integer NOT NULL,
    "username" varchar(100) NOT NULL, --email
    "password" varchar(100) NOT NULL
);

CREATE TABLE "public"."team_members" (
    "team_member_id" integer generated always as identity primary key,
    "user_id" integer NOT NULL,
    "name" varchar(100) NOT NULL,
    "surname" varchar(100) NOT NULL,
    CONSTRAINT "team_members_user_id_fkey" 
        FOREIGN KEY ("user_id") 
        REFERENCES "public"."users" ("user_id") 
        ON DELETE CASCADE
        DEFERRABLE INITIALLY DEFERRED
);

ALTER TABLE "public"."users" ADD CONSTRAINT "users_team_member_id_fkey" 
    FOREIGN KEY ("team_member_id") 
    REFERENCES "public"."team_members" ("team_member_id") 
    ON DELETE CASCADE
    DEFERRABLE INITIALLY DEFERRED;

CREATE TABLE "public"."event_types" (
    "event_type_id" integer generated always as identity primary key,
    "type" varchar(20) NOT NULL,
    CONSTRAINT "event_types_unique" UNIQUE ("type")
);

CREATE TABLE "public"."events" (
    "event_id" integer generated always as identity primary key,
    "team_member_id" integer NOT NULL,
    "event_type_id" integer NOT NULL,
    "title" varchar(100) NOT NULL,
    "begin_date" date NOT NULL,
    "end_date" date NOT NULL,
    CONSTRAINT "events_leader_fkey" FOREIGN KEY ("team_member_id") REFERENCES "public"."team_members" ("team_member_id") ON DELETE CASCADE,
    CONSTRAINT "event_type_fkey" FOREIGN KEY ("event_type_id") REFERENCES "public"."event_types" ("event_type_id") ON DELETE CASCADE,
    CONSTRAINT "check_dates" CHECK (end_date >= begin_date)
);

CREATE TABLE "public"."block_types" (
    "block_type_id" integer generated always as identity primary key,
    "type" varchar(20) NOT NULL,
    CONSTRAINT "block_types_unique" UNIQUE ("type")
);

CREATE TABLE "public"."blocks" (
    "block_id" integer generated always as identity primary key,
    "event_id" integer NOT NULL,
    "block_type_id" integer NOT NULL,
    "title" varchar(100),
    "description" text NOT NULL,
    "begin_time" time NOT NULL,
    "end_time" time NOT NULL,
    "place" varchar(100) NOT NULL,
    "date" date NOT NULL,
    CONSTRAINT "check_block_times" CHECK (end_time > begin_time),
    CONSTRAINT "blocks_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events" ("event_id") ON DELETE CASCADE,
    CONSTRAINT "block_type_fkey" FOREIGN KEY ("block_type_id") REFERENCES "public"."block_types" ("block_type_id") ON DELETE CASCADE
);

CREATE TABLE "public"."block_assignments" (
    "block_assignment_id" integer generated always as identity primary key,
    "block_id" integer NOT NULL,
    "team_member_id" integer NOT NULL,
    "leader" boolean NOT NULL,
    CONSTRAINT "block_assignments_block_id_fkey" FOREIGN KEY ("block_id") REFERENCES "public"."blocks" ("block_id") ON DELETE CASCADE,
    CONSTRAINT "block_assignments_team_member_id_fkey" FOREIGN KEY ("team_member_id") REFERENCES "public"."team_members" ("team_member_id") ON DELETE CASCADE
);

-- required by connect-pg-simple (storing sessions in DB)
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE); -- do not add the hidden OID column / backward compatibility

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid");
CREATE INDEX "IDX_session_expire" ON "session" ("expire");

INSERT INTO users ("team_member_id", "username", "password") VALUES
    (1, 'sampleUser123', '$2b$10$M1sjdx1mfOnDr28uSRiaLe9gB5UYWan9t5Ogi2FP2/1SoJVGn5viS'),
    (2, 'anna.pokusna@example.com', '$2b$10$examplehashforanna00000000000000000000000000000000'),
    (3, 'martin.novy@example.com', '$2b$10$examplehashformartin000000000000000000000000000');

INSERT INTO team_members ("user_id", "name", "surname") VALUES
    (1, 'Jozko', 'Mrkvicka'),
    (2, 'Anna', 'Pokusna'),
    (3, 'Martin', 'Novy');

INSERT INTO event_types (type) VALUES
    ('festival'),
    ('tábor');

INSERT INTO events ("team_member_id", "event_type_id", "title", "begin_date", "end_date") VALUES
    (1, 1, 'Festival 123', '2024-09-01', '2024-09-03'),
    (1, 1, 'Letný festival - deň 1', '2024-07-10', '2024-07-12'),
    (1, 2, 'Detský tábor - začiatok turnusu', '2024-08-01', '2024-08-07'),
    (1, 1, 'Mestský koncert', '2025-05-15', '2025-05-15'),
    (1, 2, 'Víkendový tímový retreat', '2024-11-22', '2024-11-24'),
    (1, 1, 'Novoročný open-air', '2025-01-01', '2025-01-01'),
    (1, 1, 'Jarný hudobný festival', '2026-03-20', '2026-03-22'),
    (1, 2, 'Letný výcvikový tábor - turnus A', '2026-07-05', '2026-07-12'),
    (1, 1, 'Jednodňový open-air', '2026-05-30', '2026-05-30'),
    (1, 2, 'Rodinný víkendový tábor', '2026-08-14', '2026-08-16'),
    (1, 1, 'Nováčikovský koncert', '2026-01-10', '2026-01-10'),
    (1, 2, 'Workshop pre vedúcich', '2026-11-02', '2026-11-04'),
    (1, 1, 'Vianočný jarmok', '2026-12-18', '2026-12-18');

INSERT INTO block_types (type) VALUES
    ('koncert'),
    ('workshop'),
    ('obed');

INSERT INTO blocks ("event_id", "block_type_id", "title", "description", "begin_time", "end_time", "place", "date") VALUES
    (1, 1, 'Koncert 123',
    'Akustické vystúpenie lokálnej indie kapely v intímnom prostredí, vhodné pre všetky vekové skupiny, s miestami na sedenie aj státie, predaj nápojov pri vstupe. Začiatok 20:00, dĺžka ~90 min, vstup voľný.', 
    '08:00:00', '10:00:00', 'Hlavné pódium', '2024-09-01'),
    (1, 2, 'Workshop 123',
    '"Umenie recyklovanej tvorby": interaktívna 60-minútová hodina s limitovaným počtom miest, praktické ukážky výroby doplnkov z recyklovaných materiálov, materiál zabezpečený, lektor k dispozícii, vhodné pre začiatočníkov i pokročilých.', 
    '10:00:00', '12:00:00', 'Tvorivá dielňa', '2024-09-02'),
    (1, 3, 'Obed 123',
    'pokojná atmosféra pri spoločnom sedení, krátke servírovanie, rýchla obsluha, vhodné pre rodiny i skupiny, stolovanie v priestoroch festivalu s výhľadom na hlavné pódium.', 
    '12:00:00', '13:00:00', 'Gastronomická zóna', '2024-09-02'),
    (1, 1, 'Afterparty Koncert', 'Krátky set miestnej kapely po hlavnom programe.', '22:30:00', '23:30:00', 'Afterstage', '2024-09-01'),
    (2, 1, 'Deň 1 - Otvárací koncert', 'Otvorenie festivalu koncertom.', '18:00:00', '20:00:00', 'Hlavné pódium', '2024-07-10'),
    (3, 2, 'Tábor - ranné cvičenie', 'Jutarní rozcvička pre účastníkov tábora.', '08:00:00', '08:30:00', 'Táborisko', '2024-08-01'),
    (4, 1, 'Mestský koncert - headliner', 'Hlavný koncert večera.', '19:30:00', '21:00:00', 'Mestské námestie', '2025-05-15'),
    (5, 3, 'Retreat - obedy', 'Spoločné obedy pre účastníkov retreatu.', '12:00:00', '13:00:00', 'Chatka', '2024-11-22'),
    (6, 1, 'Novoročný open-air - ohňostroj', 'Krátky koncert s následným ohňostrojom.', '00:00:00', '00:30:00', 'Park', '2025-01-01'),
    (7, 1, 'Jarný festival - hlavný stage', 'Program na hlavnom pódiu.', '17:00:00', '19:00:00', 'Festivalové pódium', '2026-03-20'),
    (8, 2, 'Výcvik - praktický workshop', 'Tréningové cvičenia pre vedúcich.', '09:00:00', '12:00:00', 'Cvičisko', '2026-07-05'),
    (9, 1, 'Jednodňový open-air - odpoledné vystúpenie', 'Krátke popoludňajšie vystúpenie.', '15:00:00', '16:30:00', 'Park', '2026-05-30'),
    (10, 3, 'Rodinný tábor - obed', 'Obed pre rodiny účastníkov tábora.', '13:00:00', '14:00:00', 'Stánok s jedlom', '2026-08-14'),
    (11, 1, 'Nováčikovský koncert - set', 'Krátke vystúpenie pre nováčikov.', '18:00:00', '19:00:00', 'Malé pódium', '2026-01-10'),
    (12, 2, 'Workshop pre vedúcich - skupinová práca', 'Interaktívny workshop.', '10:00:00', '13:00:00', 'Konferenčná miestnosť', '2026-11-02'),
    (13, 1, 'Vianočný jarmok - vystúpenie', 'Krátke kultúrne vystúpenie počas jarmoku.', '16:00:00', '17:00:00', 'Námestie', '2026-12-18');

INSERT INTO block_assignments ("block_id", "team_member_id", "leader") VALUES
    (1, 1, false),
    (2, 1, false),
    (4, 1, true), 
    (5, 1, false),
    (6, 2, false),
    (7, 2, true),
    (8, 3, false),
    (9, 3, false),
    (10, 2, false),
    (11, 3, true),
    (12, 2, false),
    (13, 1, false),
    (14, 2, true),
    (15, 3, false);

COMMIT;
