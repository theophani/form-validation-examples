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

var output = document.createElement('div');
document.body.appendChild(output);

// The confirmation happens on success
var confirm = function (response) {
  output.innerHTML = response;
};
