var form = document.forms[0];

form.addEventListener('submit', function (event) {

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

var submitButton = document.querySelectorAll('[type=submit]')[0];
var inputs = Array.prototype.slice.apply(form.elements);

submitButton.addEventListener('click', function (event) {

  inputs.forEach(function (input) {
    input.setCustomValidity('');

    var message = input.dataset.customValidationMessage || '';

    if (!input.validity.valid) {
      input.setCustomValidity(message);
    }
  });

});

var confirm = function (response) {
  output.innerHTML = response;
};

var output = document.createElement('div');
document.body.appendChild(output);
