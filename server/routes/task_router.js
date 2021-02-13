const express = require('express');
const router = express.Router();

// connect router to db with pg:
let pool = require('../modules/pool');

// Add info to the task table in db:
router.post('/', (req, res) => {
  console.log('req.body', req.body);
  // Create variable to buffer for SQL injections:
  // These will represent $1 and $2
  let taskList = [req.body.todo, req.body.completed];

  // Access info in our db:
  pool
    .query(
      `
  INSERT INTO "tasks"
    ("todo", "completed")
  VALUES
    ($1, $2);`,
      taskList
    )
    .then(function (dbRes) {
      res.sendStatus(200);
    })
    .catch(function (error) {
      console.log('post error:', error);
      res.sendStatus(500);
    });
});

// Send tasks table info from db to client:
router.get('/', (req, res) => {
  // query the db:
  pool
    .query(
      `SELECT * FROM "tasks"
            ORDER BY "id" ASC`
    )
    .then(function (dbRes) {
      console.log('dbRes:', dbRes.rows);
      res.send(dbRes.rows);
    })
    .catch(function (error) {
      console.log('GET error:', error);
      res.sendStatus(500);
    });
});

// Update task completed status in db:
router.put('/:id', (req, res) => {
  console.log('req.body:', req.body);
  console.log('req.params:', req.params);

  let taskToUpdateId = req.params.id;
  let sqlText = '';

  let taskToUpdateStatus = req.body.thisTaskStatus;

  // Write condition that changes task status from current state:
  // (this will allow for a toggle function with the button)
  if (taskToUpdateStatus === 'true') {
    sqlText = `UPDATE "tasks" SET "completed"=FALSE WHERE id=$1`;
  } else if (taskToUpdateStatus === 'false') {
    sqlText = `UPDATE "tasks" SET "completed"=TRUE WHERE id=$1`;
  } else {
    console.log('PUT update error');
    res.sendStatus(500);
    return; // To stop next code running
  }

  // Send output from conditional statement to db:
  pool
    .query(sqlText, [taskToUpdateId])
    .then((dbRes) => {
      console.log('dbRes:', dbRes);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('PUT pg error:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
