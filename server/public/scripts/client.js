console.log('JS running!');

$(document).ready(onReady);

function onReady() {
  console.log('JQ running!');

  // Get existing tasks to display on DOM:
  getTasksFromDB();

  // Set up event listeners:
  $(document).on('submit', '#task-form', handleSubmit);
}

function handleSubmit(event) {
  // prevent form from default refresh:
  event.preventDefault();
  console.log('in handleSubmit');

  // create object to hold input values:
  let newTask = {
    todo: $('#input-task').val(),
    completed: false,
  };

  console.log('newToDo:', newTask);

  // Clear input box after collecting data:
  $('#input-task').val('');

  // Call function to post new input to server:
  saveTask(newTask);
}

function getTasksFromDB() {
  // GET the tasks saved in db:
  $.ajax({
    method: 'GET',
    url: '/tasks',
  })
    .then(function (response) {
      console.log('GET response:', response);
      renderTasks(response);
    })
    .catch(function (error) {
      console.log('GET error:', error);
    });
}

function renderTasks(array) {
  console.log('in renderTasks', array);

  // Avoid appending same db data multiple times:
  $('#to-do-list').empty();

  // Loop through tasks info from db and append to DOM:
  for (let task of array) {
    // create local variable to represent css
    // change when task complete:
    let completedTask;

    // Write conditional to determine how to manipulate completedTask:
    if (task.completed === true) {
      completedTask = 'taskCompleteClass';
    }

    $('#to-do-list').append(`
        <tr class=${completedTask}>
          <td>${task.todo}</td>
          <td>${task.completed}</td>
          <td>
            <button class ="complete-check button" data-id="${task.id}">Completed</button>
          </td>
          <td>
            <button class ="delete-task button" data-id="${task.id}" >DELETE</button>
          </td>
        </tr>
        `);
  }
}

function saveTask(newToDo) {
  console.log('in saveTask', newToDo);

  // POST new input to server:
  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: newToDo,
  })
    .then(function (response) {
      console.log('POST response:', response);
      getTasksFromDB();
    })
    .catch(function (error) {
      console.log("ERROR, didn't POST new task:", error);
      alert('Error posting your task');
    });
}
