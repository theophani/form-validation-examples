var form = document.forms[0];
var submitButton = form.querySelector('[type=submit]');

form.addEventListener('submit', function (event) {

  event.preventDefault();

  removeHints(form);

  if (form.checkValidity()) {
    // Now do Ajax stuff here!
    $.ajax({
      url: form.action,
      data: $.serialize(form),
      success: confirm
    });
  }

});

// Safari default here is to fire a submit event at the form.
// Safari never performs the checkValidity() unprompted.
//
// Chrome/Firefox default here is to checkValidity of form.
// Chrome/Firefox submit event not fired (cancelled?)
// if checkValidity returns false.
//
// It is possible (if the form is one field) to fire
// a submit event without this click event happening.
//
// Approach:
// Cancel the default, then explicity fire submit at form.
// This centralizes the checkValidity().

submitButton.addEventListener('click', function (event) {

  event.preventDefault();

  var e = document.createEvent('HTMLEvents');
  e.initEvent('submit', true, true);
  form.dispatchEvent(e);

});

var output = document.createElement('div');
document.body.appendChild(output);

var confirm = function (response) {
  output.innerHTML = response;
};

document.addEventListener('invalid', function (event) {

  event.preventDefault(); // silence hints in Chrome and Firefox

  var input = event.target;
  var message = input.validationMessage;
  var hint;
  input.form.hints = input.form.hints || [];

  if (!input.validity.valid) {
    if (!input.validity.customError && input.dataset.customValidationMessage) {
      message = input.dataset.customValidationMessage;
    }
    hint = document.createElement('span');
    hint.innerHTML = message;
    input.form.insertBefore(hint, input);
    input.form.hints.push(hint);
    input.hint = hint;
    input.addEventListener('keyup', checkInputValidity);
  }

}, true); // true bubbles events from inputs

var checkInputValidity = function (event) {
  var input = event.target;
  input.removeEventListener('keyup', checkInputValidity);
  input.form.removeChild(input.hint);
  input.checkValidity();
}

var removeHints = function (form) {
  if (!form.hints) return;

  while (form.hints.length) {
    try {
      form.removeChild(form.hints.pop());
    } catch (err) {
      // already removed from DOM
    }
  }
};
