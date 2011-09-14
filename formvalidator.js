var $, FormValidator, check, getFormData, getNames, getValidationResults, qs, showSummary, validateName;
qs = require('qs');
$ = require('jquery');
check = require('./validators');
showSummary = function(results) {
  var errors, message, name, r, _i, _len, _results;
  errors = $('.formvalidation-errors').html('').append('<ul></ul>').find('ul');
  _results = [];
  for (_i = 0, _len = results.length; _i < _len; _i++) {
    r = results[_i];
    name = r.name;
    message = r.message;
    _results.push(errors.append('<li>' + message + '</li>'));
  }
  return _results;
};
getValidationResults = function(formData, validators) {
  var name, result, temp, v, validator, _i, _len;
  result = [];
  for (_i = 0, _len = validators.length; _i < _len; _i++) {
    v = validators[_i];
    name = v.name;
    validator = v.validator;
    temp = validator(formData);
    if ((temp != null) && temp.length > 0) {
      result.push({
        name: name,
        message: temp
      });
    }
  }
  return result;
};
getNames = function(validators) {
  var results, v, _i, _len;
  results = [];
  for (_i = 0, _len = validators.length; _i < _len; _i++) {
    v = validators[_i];
    if ($.inArray(v.name, results) === -1) {
      results.push(v.name);
    }
  }
  return results;
};
validateName = function(form, formData, name, validators) {
  var errorLabels, fields, r, results, v, _fn, _i, _len;
  validators = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = validators.length; _i < _len; _i++) {
      v = validators[_i];
      if (v.name === name) {
        _results.push(v);
      }
    }
    return _results;
  })();
  results = getValidationResults(formData, validators);
  fields = form.find('[name="' + name + '"]');
  errorLabels = form.find('[error="' + name + '"]').html('').append('<ul></ul>').find('ul');
  if (results.length > 0) {
    _fn = function(r) {
      return errorLabels.append('<li>' + r.message + '</li>');
    };
    for (_i = 0, _len = results.length; _i < _len; _i++) {
      r = results[_i];
      _fn(r);
    }
    errorLabels.parent().addClass('formvalidation-error');
    return fields.addClass('formvalidation-input-error');
  } else {
    errorLabels.parent().removeClass('formvalidation-error');
    return fields.removeClass('formvalidation-input-error');
  }
};
getFormData = function(form) {
  return qs.parse(form.serialize());
};
FormValidator = (function() {
  function FormValidator() {
    this.validators = [];
  }
  FormValidator.prototype.add = function(name, validator) {
    return this.validators.push({
      name: name,
      validator: validator
    });
  };
  FormValidator.prototype.validate = function(formData) {
    return getValidationResults(formData, this.validators);
  };
  FormValidator.prototype.clientValidate = function(formId) {
    var formData;
    formData = getFormData($('#' + formId));
    return this.validate(formData);
  };
  FormValidator.prototype.clientSetup = function(formId) {
    var form, name, names, self, validateElements, validators, _fn, _i, _len;
    form = $('#' + formId);
    validators = this.validators;
    names = getNames(validators);
    self = this;
    validateElements = function() {
      var formData, name, _i, _len, _results;
      formData = getFormData(form);
      _results = [];
      for (_i = 0, _len = names.length; _i < _len; _i++) {
        name = names[_i];
        _results.push((function(name) {
          return validateName(form, formData, name, validators);
        })(name));
      }
      return _results;
    };
    _fn = function(name) {
      return form.find('[name="' + name + '"]').bind('blur', function(e) {
        var formData;
        formData = getFormData(form);
        validateName(form, formData, name, validators);
        return true;
      });
    };
    for (_i = 0, _len = names.length; _i < _len; _i++) {
      name = names[_i];
      _fn(name);
    }
    return form.submit(function(e) {
      var results;
      results = self.clientValidate(formId);
      if (results.length > 0) {
        e.preventDefault();
        showSummary(results);
        validateElements();
        return true;
      }
    });
  };
  return FormValidator;
})();
exports.FormValidator = FormValidator;
exports.check = check;