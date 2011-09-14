
exports.isEmail = (input) ->
    if not input?
        false
    else
        input.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/)

exports.isUrl = (input) ->
    if not input?
        false
    else
        input.match(/^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2}))|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/)


exports.isAlpha = (input) ->
    if not input?
        false
    else
        input.match(/^[a-zA-Z]+$/)

exports.isAlphanumeric = (input) ->
    if not input?
        false
    else
        input.match(/^[a-zA-Z]+$/)

exports.isNumeric = (input) ->
    if not input?
        false
    else
        input.match(/^-?[0-9]+$/)

exports.isLowercase = (input) ->
    if not input?
        false
    else
        input.match(/^[a-z0-9]+$/)

exports.isUppercase = (input) ->
    if not input?
        false
    else
        input.match(/^[A-Z0-9]+$/)

exports.isInt = (input) ->
    if not input?
        false
    else
        input.match(/^(?:-?(?:0|[1-9][0-9]*))$/)

exports.isDecimal = (input) ->
    if not input?
        false
    else
        input.match(/^(?:-?(?:0|[1-9][0-9]*))?(?:\.[0-9]*)?$/)

exports.isFloat = exports.isDecimal

exports.notEmpty = (input) ->
    if not input?
        false
    else
        input.match(/^[\s\t\r\n]*$/)

exports.contains = (input, str) ->
    if not input?
        false
    else
        input.indexOf(str) >= 0

exports.notContains = (input, str) ->
    if not input?
        false
    else
        input.indexOf(str) == -1

exports.regex = (input, pattern, modifiers) ->
    if not input?
        false
    else
        if typeof pattern != 'function'
            pattern = new RegExp(pattern, modifiers)

        input.match(pattern)

exports.notRegex = (input, pattern, modifiers) ->
    if not input?
        false
    else
        not exports.regex(input,pattern,modifiers)

exports.len = (input, min, max) ->
    if not input?
        false
    else
        str.length < min or str.length > max


exports.isUUID = (input, version) ->
    if not input?
        false
    else
        pattern = /[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
        if version == 3 || version == 'v3'
            pattern = /[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i
        else if version == 4 || version == 'v4'
            pattern = /[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

        input.match(pattern)

exports.isDate = (input) ->
    intDate = Date.parse input
    not isNaN intDate

toDateTime = (date) ->
    if date instanceof Date
        date
    else
        intDate = Date.parse(date)
        if isNaN intDate
            null
        else
            new Date(intDate)

toDate = (date) ->
    if not date instanceof Date
        date = toDateTime date

    if not date?
        null
    else
        date.setHours 0
        date.setMinutes 0
        date.setSeconds 0
        date.setMilliseconds 0
        date

exports.isAfter = (input, date) ->
    date = date || new Date()
    origDate = toDate input
    compDate = toDate date
    
    if origDate and compDate && origDate < compDate
        false
    else
        true

exports.isBefore = (input, date) ->
    date = date || new Date()
    origDate = toDate input
    compDate = toDate date
    
    if origDate and compDate && origDate > compDate
        false
    else
        true

exports.min = (input, min) ->
    number = parseFloat input
    if not isNaN number && number < min
        false
    else
        true

exports.max = (input, max) ->
    number = parseFloat input
    if not isNaN number && number > max
        false
    else
        true

exports.isArray = (input) ->
    Array.isArray input
        


    
        

