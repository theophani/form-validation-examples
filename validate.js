var form = document.forms[0];

form.addEventListener('submit', function (event) {

  // Safari gets here, because it fires a submit event at the form when the submit button is clicked
  // Chrome and Firefox do not fire a submit when the submit button is clicked but the form is not valid
  // The spec allows both interpretations

  event.preventDefault();

  if (form.checkValidity()) {
    // Now do Ajax stuff here!
    $.ajax({
      url: form.action,
      data: $.serialize(form),
      success: confirm
    });
  }

});

var output = document.createElement('div');
document.body.appendChild(output);

// The confirmation happens on success
var confirm = function (response) {
  output.innerHTML = response;
};

var warn = function (form) {
  console.log('test');
  var inputs = Array.prototype.slice.apply(form.elements);
  inputs.forEach(function (input) {
    var message = input.validationMessage;
    var label, hint;
    if (!input.validity.valid) {
      if (!input.validity.customError && input.dataset.customValidationMessage) {
        message = input.dataset.customValidationMessage;
      }
      hint = document.createElement('span');
      hint.innerText = message;
      form.insertBefore(hint, input);
      console.log(message);
    }
  });
};

var submitButton = form.querySelector('[type=submit]');

submitButton.addEventListener('click', function (event) {

  // Chrome and Firefox default: checkValidity of form
  // Safari default: submit form

  // Approach: cancel the default, explicity fire submit at form

});

form.addEventListener('invalid', function (event) {

  // In Chrome and Firefox,
  // these events are fired on submitButtom click
  // before submit is fired.

  // In Safari, one must manually execute checkValidity()
  // within the submit event listener.

  event.preventDefault();

  var input = event.srcElement;
  var message = input.validationMessage;
  var hint;

  if (!input.validity.valid) {
    if (!input.validity.customError && input.dataset.customValidationMessage) {
      message = input.dataset.customValidationMessage;
    }
    hint = document.createElement('span');
    hint.innerText = message;
    form.insertBefore(hint, input);
  }

}, true); // true [useCapture] needed to bubble events from inputs
