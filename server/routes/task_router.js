const express = require('express');
const router = express.Router();

// connect router to db with pg:
let pool = require('../modules/pool');

// Store this information in the db:
// let taskArray = [
//   {
//     todo: 'Clean the bathroom',
//     completed: false,
//   },
//   {
//     todo: 'Sweep the floor',
//     completed: false,
//   },
//   {
//     todo: 'Do HW',
//     completed: false,
//   },
//   {
//     todo: 'Go for a jog',
//     completed: false,
//   },
//   {
//     todo: 'Make dinner',
//     completed: false,
//   },
// ];

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

router.get('/', (req, res) => {});

module.exports = router;
