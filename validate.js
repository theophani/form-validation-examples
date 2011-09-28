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
  } else {
    warn(form);
  }

});

var output = document.createElement('div');
document.body.appendChild(output);

// The confirmation happens on success
var confirm = function (response) {
  output.innerHTML = response;
};

var warn = function (form) {
  var innerHTML = '';
  var inputs = Array.prototype.slice.apply(form.elements);
  inputs.forEach(function (input) {
    var message = input.validationMessage;
    if (!input.validity.valid) {
      if (!input.validity.customError && input.dataset.customValidationMessage) {
        message = input.dataset.customValidationMessage;
      }
      innerHTML += '<p>' + message + '</p>';
    }
  });
  output.innerHTML = innerHTML;
};

var submitButton = form.querySelector('[type=submit]');

submitButton.addEventListener('click', function (event) {

  // Chrome and Firefox default: checkValidity of form
  // Safari default: submit form

  // Approach: cancel the default, explicity fire submit at form

  event.preventDefault();

  var e = document.createEvent('HTMLEvents');
  e.initEvent('submit', true, true);
  form.dispatchEvent(e);

}, true);

form.addEventListener('invalid', function (event) {
  // hrmm
}, true);
