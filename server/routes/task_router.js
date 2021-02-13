const express = require('express');
const router = express.Router();

// connect router to db with pg:
let pool = require('../modules/pool');

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

router.get('/', (req, res) => {
  // query the db:
  pool
    .query(`SELECT * FROM "tasks"`)
    .then(function (dbRes) {
      console.log('dbRes:', dbRes.rows);
      res.send(dbRes.rows);
    })
    .catch(function (error) {
      console.log('GET error:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
