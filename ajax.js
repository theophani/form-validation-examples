var $ = {};

// My fake ajax method that mocks a response
$.ajax = function (options) {
  var response = 'Your form has been submitted! <br />';
  for (prop in options.data) {
    response += prop + ': ' + options.data[prop] + '<br />';
  };

  options.success(response);
};

// Actually, this fake serialize returns a hash
$.serialize = function (form) {
  var hash = {};
  var elements = Array.prototype.slice.apply(form.elements);

  elements.forEach(function (element) {
    if (element.name !== '') {
      hash[element.name] = element.value;
    }
  });

  return hash;
};
