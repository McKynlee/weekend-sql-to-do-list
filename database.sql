CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"todo" VARCHAR(1024) NOT NULL,
	"completed" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks"
	("todo", "completed")
VALUES
	('Create this to-do list', TRUE)
	('Clean the bathroom', FALSE),
	('Sweep the floor', FALSE),
	('Do HW', FALSE),
	('Make dinner', FALSE),
	('Go for jog', FALSE);
	
	
SELECT * FROM "tasks";
