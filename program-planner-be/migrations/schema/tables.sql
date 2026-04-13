DROP TABLE users;
DROP TABLE team_members;


CREATE TABLE "public"."users" (
    "user_id" varchar(100) NOT NULL,
    "team_member_id" varchar(100) NOT NULL,
    "username" varchar(100) NOT NULL, --email
    "password" varchar(100) NOT NULL,
    PRIMARY KEY ("user_id")
    CONSTRAINT "team_member_fk" FOREIGN KEY ("user_id")
);

CREATE TABLE "public"."team_members" (
    "member_id" varchar(100) NOT NULL,
    "user_id" varchar(100) NOT NULL,
    "first_name" varchar(100) NOT NULL,
    "last_name" varchar(100) NOT NULL,
    PRIMARY KEY ("member_id"),
    CONSTRAINT "user_fk" FOREIGN KEY ("user_id")
    REFERENCES "public"."users" ("user_id") ON DELETE CASCADE
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

INSERT INTO "public"."users"(user_id, team_member_id, username, password) VALUES
    ('sampleUser123', 'sampleMember123', 'sampleUser123', 'password123');
COMMIT;
