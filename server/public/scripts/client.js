console.log('JS running!');

$(document).ready(onReady);

function onReady() {
  console.log('JQ running!');

  // Set up event listeners:
  $(document).on('submit', '#task-form', handleSubmit);
}

function handleSubmit(event) {
  // prevent form from default refresh:
  event.preventDefault();
  console.log('in handleSubmit');

  let newToDo = {
    todo: $('#input-task').val(),
    completed: false,
  };

  console.log('newToDo:', newToDo);

  // Clear input box after collecting data:
  $('#input-task').val('');
}
