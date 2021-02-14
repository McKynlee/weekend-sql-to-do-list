// Bring Express into the party:
const express = require('express');
const app = express();

// Run on port 5000:
const port = 5000;

// Let public folder be viewable in browser:
app.use(express.static('server/public'));

// Set up json/express the rest of the way:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Bring in Bootstrap:
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
// app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// Incorporate routes:
let taskRouter = require('./routes/task_router');
app.use('/tasks', taskRouter);

// Start your server app!
app.listen(port, function () {
  console.log("I'm listening....", port);
});
