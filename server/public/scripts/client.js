console.log('JS running!');

$(document).ready(onReady);

function onReady() {
  console.log('JQ running!');

  // Get existing tasks to display on DOM:
  getTasksFromDB();

  // Set up event listeners:
  $(document).on('submit', '#task-form', handleSubmit);
  $(document).on('click', '.check-off', updateTask);
  $(document).on('click', '.delete-task', deleteTask);
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
    let completedTask = 'bg-primary';
    let completeButtonText = 'Check off task!';
    let ifMarkedComplete;

    // Write conditional to determine how to manipulate completedTask:
    if (task.completed === true) {
      completedTask = 'bg-success';
      completeButtonText = 'Re-Add to task list';
      ifMarkedComplete = 'bg-warning text-dark';
    }

    $('#to-do-list').append(`
        <tr class=${completedTask}>
          <td>${task.todo}</td>
          <td>
            <button class="${ifMarkedComplete} bg-success text-light check-off button" 
            data-id="${task.id}" data-status="${task.completed}">
            ${completeButtonText}
            </button>
          </td>
          <td>
            <button class ="bg-danger text-light delete-task button" data-id="${task.id}" >DELETE</button>
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

function updateTask() {
  console.log('in updateTask');

  // Target the specific task clicked on:
  let thisTaskId = $(this).data('id');

  // Target the element info you want to update:
  let thisTaskStatus = $(this).data('status');

  // Communicate with server to make update:
  $.ajax({
    method: 'PUT',
    url: `/tasks/${thisTaskId}`,
    data: {
      thisTaskStatus,
    },
  })
    .then((response) => {
      console.log('Successfully completed task!');
      getTasksFromDB();
    })
    .catch((error) => {
      console.log('ERROR in updating:', error);
      alert('Error with updating task');
    });
}

function deleteTask() {
  // Target specific task clicked for deletion:
  let taskToDelete = $(this).data('id');

  // console.log(
  //   'in deleteTask, clicked this:',
  //   this,
  //   'taskToDelete:',
  //   taskToDelete
  // );

  // Send selected task by id to server for deletion:
  $.ajax({
    method: 'DELETE',
    url: `/tasks/${taskToDelete}`,
  })
    .then((response) => {
      // When deletion in db complete, refresh DOM:
      getTasksFromDB();
    })
    .catch((error) => {
      console.log('Error deleting book:', error);
      alert('Error deleting book');
    });
}
