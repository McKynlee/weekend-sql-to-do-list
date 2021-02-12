console.log('JS running!');

$(document).ready(onReady);

function onReady() {
  console.log('JQ running!');

  // Get existing tasks to display on DOM:
  renderTasks();

  // Set up event listeners:
  $(document).on('submit', '#task-form', handleSubmit);
}

function handleSubmit(event) {
  // prevent form from default refresh:
  event.preventDefault();
  console.log('in handleSubmit');

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

function renderTasks(array) {
  console.log('in renderTasks');

  for (let task of taskArray) {
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
    })
    .catch(function (error) {
      console.log("ERROR, didn't POST new task:", error);
    });
}
