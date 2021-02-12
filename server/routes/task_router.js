const express = require('express');
const router = express.Router();

// connect router to db with pg:
let pool = require('../modules/pool');

let taskArray = [
  {
    todo: 'Clean the bathroom',
    completed: false,
  },
  {
    todo: 'Sweep the floor',
    completed: false,
  },
  {
    todo: 'Do HW',
    completed: false,
  },
  {
    todo: 'Go for a jog',
    completed: false,
  },
  {
    todo: 'Make dinner',
    completed: false,
  },
];

router.post('/', (req, res) => {
  console.log('req.body', req.body);
  // Create variable to buffer for SQL injections:
  let taskList = [req.body.todo, req.body.completed];
});

module.exports = router;
