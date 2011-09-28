var form = document.forms[0];

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

// The confirmation happens on success
var confirm = function (response) {
  var output = document.createElement('div');
  output.innerHTML = response;
  document.body.appendChild(output);
};

var submitButton = form.querySelector('[type=submit]');

submitButton.addEventListener('click', function (event) {

  // Safari default here is to fire a submit event at the form.
  // Safari never performs the checkValidity() unprompted.

  // Chrome/Firefox default here is to checkValidity of form.
  // Chrome/Firefox submit event not fired (cancelled?)
  // if checkValidity returns false.

  // It is possible (if the form is one field) to fire
  // a submit event without this click event happening.

  // Approach:
  // Cancel the default, then explicity fire submit at form.
  // This centralizes the checkValidity().

  event.preventDefault();

  var e = document.createEvent('HTMLEvents');
  e.initEvent('submit', true, true);
  form.dispatchEvent(e);

});

form.addEventListener('invalid', function (event) {

  event.preventDefault(); // silence hints in Chrome and Firefox

  var input = event.srcElement;
  var message = input.validationMessage;
  var hint;
  form.hints = form.hints || [];

  if (!input.validity.valid) {
    if (!input.validity.customError && input.dataset.customValidationMessage) {
      message = input.dataset.customValidationMessage;
    }
    hint = document.createElement('span');
    hint.innerText = message;
    form.insertBefore(hint, input);
    form.hints.push(hint);
  }

}, true); // true [useCapture] needed to bubble events from inputs

var removeHints = function (form) {
  if (!form.hints) return;

  while (form.hints.length) {
    form.removeChild(form.hints.pop());
  }
};
