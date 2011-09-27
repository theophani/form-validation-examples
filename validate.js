var form = document.forms[0];

var EMAIL_REGEX = /somecrazylongpatternidontpretendtoknow/;

var valid = function () {
  form.warnings = [];

  var validity = true;
  var name = document.getElementById('name');
  var coupon = document.getElementById('coupon');
  var email = document.getElementById('email');
  var secret = document.getElementById('secret');

  if (name.value === '') {
    validity = false;
    form.warnings.push('Name is required');
  }

  if (coupon.value !== '' && !coupon.value.match('free|halfprice')) {
    validity = false;
    form.warnings.push('Only correct coupons are allowed');
  }

  if (email.value !== '' && !email.value.match(EMAIL_REGEX)) {
    validity = false;
    form.warnings.push('Please enter a valid email address');
  }

  if (secret.value === '' || secret.value !== 'reject') {
    validity = false;
    form.warnings.push('Be sure to enter the SECRET CODE!');
  }

  return validity;
};

var warn = function () {
  var text = '';

  form.warnings.forEach(function (warning) {
    text += '<p>' + warning + '</p>';
  });

  output.innerHTML = text;
};

var output = document.createElement('div');
document.body.appendChild(output);

form.addEventListener('submit', function(event) {
  if (!valid()) {
    event.preventDefault();
    warn();
  }
});

