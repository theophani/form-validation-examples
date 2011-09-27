var form = document.forms[0];
var submitButton = document.querySelectorAll('[type=submit]')[0];
var inputs = Array.prototype.slice.apply(form.elements);

form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (form.checkValidity()) {
    // Now do Ajax stuff here!
    $.ajax({
      url: form.action,
      data: $.serialize(form),
      success: confirm
    });
  } else {
    warn(inputs);
  }

});

submitButton.addEventListener('click', function (event) {

  inputs.forEach(function (input) {
    var message = input.dataset.customValidationMessage || '';
    input.setCustomValidity('');

    if (!input.validity.valid) {
      input.setCustomValidity(message);
    }
  });

});

var output = document.createElement('div');
document.body.appendChild(output);

var confirm = function (response) {
  output.innerHTML = response;
};

var warn = function (inputs) {
  var text = '';

  inputs.forEach(function (input) {
    if (!input.validity.valid)
    text += '<p>' + input.validationMessage + '</p>';
  });

  output.innerHTML = text;
};
