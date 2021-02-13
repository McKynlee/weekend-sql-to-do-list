CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"todo" VARCHAR(1024) NOT NULL,
	"completed" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks"
	("todo", "completed")
VALUES
	('Clean the bathroom', FALSE),
	('Sweep the floor', FALSE),
	('Do HW', TRUE),
	('Make dinner', FALSE),
	('Go for jog', TRUE);
	
	
SELECT * FROM "tasks";