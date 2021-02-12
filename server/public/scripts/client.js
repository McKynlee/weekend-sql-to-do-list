console.log('JS running!');

$(document).ready(onReady);

function onReady() {
  console.log('JQ running!');

  // Set up event listeners:
  $(document).on('submit', '#task-form', handleSubmit);
}

function handleSubmit(event) {
  event.preventDefault();
  console.log('in handleSubmit');
}
