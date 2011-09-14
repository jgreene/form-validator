var toDate, toDateTime;
exports.isEmail = function(input) {
  if (!(input != null)) {
    return false;
  } else {
    return input.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/);
  }
};
exports.isUrl = function(input) {
  if (!(input != null)) {
    return false;
  } else {
    return input.match(/^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2}))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/);
  }
};
exports.isAlpha = function(input) {
  if (!(input != null)) {
    return false;
  } else {
    return input.match(/^[a-zA-Z]+$/);
  }
};
exports.isAlphanumeric = function(input) {
  if (!(input != null)) {
    return false;
  } else {
    return input.match(/^[a-zA-Z]+$/);
  }
};
exports.isNumeric = function(input) {
  if (!(input != null)) {
    return false;
  } else {
    return input.match(/^-?[0-9]+$/);
  }
};
exports.isLowercase = function(input) {
  if (!(input != null)) {
    return false;
  } else {
    return input.match(/^[a-z0-9]+$/);
  }
};
exports.isUppercase = function(input) {
  if (!(input != null)) {
    return false;
  } else {
    return input.match(/^[A-Z0-9]+$/);
  }
};
exports.isInt = function(input) {
  if (!(input != null)) {
    return false;
  } else {
    return input.match(/^(?:-?(?:0|[1-9][0-9]*))$/);
  }
};
exports.isDecimal = function(input) {
  if (!(input != null)) {
    return false;
  } else {
    return input.match(/^(?:-?(?:0|[1-9][0-9]*))?(?:\.[0-9]*)?$/);
  }
};
exports.isFloat = exports.isDecimal;
exports.notEmpty = function(input) {
  if (!(input != null)) {
    return false;
  } else {
    return input.match(/^[\s\t\r\n]*$/);
  }
};
exports.contains = function(input, str) {
  if (!(input != null)) {
    return false;
  } else {
    return input.indexOf(str) >= 0;
  }
};
exports.notContains = function(input, str) {
  if (!(input != null)) {
    return false;
  } else {
    return input.indexOf(str) === -1;
  }
};
exports.regex = function(input, pattern, modifiers) {
  if (!(input != null)) {
    return false;
  } else {
    if (typeof pattern !== 'function') {
      pattern = new RegExp(pattern, modifiers);
    }
    return input.match(pattern);
  }
};
exports.notRegex = function(input, pattern, modifiers) {
  if (!(input != null)) {
    return false;
  } else {
    return !exports.regex(input, pattern, modifiers);
  }
};
exports.len = function(input, min, max) {
  if (!(input != null)) {
    return false;
  } else {
    return str.length < min || str.length > max;
  }
};
exports.isUUID = function(input, version) {
  var pattern;
  if (!(input != null)) {
    return false;
  } else {
    pattern = /[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
    if (version === 3 || version === 'v3') {
      pattern = /[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
    } else if (version === 4 || version === 'v4') {
      pattern = /[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    }
    return input.match(pattern);
  }
};
exports.isDate = function(input) {
  var intDate;
  intDate = Date.parse(input);
  return !isNaN(intDate);
};
toDateTime = function(date) {
  var intDate;
  if (date instanceof Date) {
    return date;
  } else {
    intDate = Date.parse(date);
    if (isNaN(intDate)) {
      return null;
    } else {
      return new Date(intDate);
    }
  }
};
toDate = function(date) {
  if (!date instanceof Date) {
    date = toDateTime(date);
  }
  if (!(date != null)) {
    return null;
  } else {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }
};
exports.isAfter = function(input, date) {
  var compDate, origDate;
  date = date || new Date();
  origDate = toDate(input);
  compDate = toDate(date);
  if (origDate && compDate && origDate < compDate) {
    return false;
  } else {
    return true;
  }
};
exports.isBefore = function(input, date) {
  var compDate, origDate;
  date = date || new Date();
  origDate = toDate(input);
  compDate = toDate(date);
  if (origDate && compDate && origDate > compDate) {
    return false;
  } else {
    return true;
  }
};
exports.min = function(input, min) {
  var number;
  number = parseFloat(input);
  if (!isNaN(number && number < min)) {
    return false;
  } else {
    return true;
  }
};
exports.max = function(input, max) {
  var number;
  number = parseFloat(input);
  if (!isNaN(number && number > max)) {
    return false;
  } else {
    return true;
  }
};
exports.isArray = function(input) {
  return Array.isArray(input);
};