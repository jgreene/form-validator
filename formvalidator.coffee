qs = require 'qs'
$ = require 'jquery'

check = require './validators'

showSummary = (results) ->
    errors = $('.formvalidation-errors').html('').append('<ul></ul>').find('ul')
    
    for r in results
        name = r.name
        message = r.message
        errors.append('<li>' + message + '</li>')

getValidationResults = (formData, validators) ->
    result = []
        
    for v in validators
        name = v.name
        validator = v.validator
        temp = validator formData
        if temp? and temp.length > 0
            result.push
                name: name
                message: temp

    result

getNames = (validators) ->
    results = []
    for v in validators
        if $.inArray(v.name, results) == -1
            results.push v.name
    
    results

validateName = (form, formData, name, validators) ->
    validators = (v for v in validators when v.name == name)

    results = getValidationResults formData, validators

    fields = form.find('[name="' + name + '"]')
    errorLabels = form.find('[error="' + name + '"]').html('').append('<ul></ul>').find('ul')
    if results.length > 0
        for r in results
            do (r) ->
                errorLabels.append('<li>' + r.message + '</li>')

        errorLabels.parent().addClass('formvalidation-error')
        fields.addClass('formvalidation-input-error')
    else
        errorLabels.parent().removeClass('formvalidation-error')
        fields.removeClass('formvalidation-input-error')

getFormData = (form) ->
    qs.parse form.serialize()



class FormValidator
    constructor: () ->
        @validators = []

    add: (name, validator) ->
        @validators.push
            name: name
            validator: validator

    validate: (formData) ->
        getValidationResults formData, @validators

    clientValidate: (formId) ->
        formData = getFormData $('#' + formId)
        
        @validate formData

    clientSetup: (formId) ->
        form = $('#' + formId)

        validators = @validators
        names = getNames validators
        self = this

        validateElements = () ->
            formData = getFormData form
            for name in names
                do (name) ->
                    validateName form, formData, name, validators
    
        
        for name in names
            do (name) ->
                form.find('[name="' + name + '"]').bind 'blur', (e) ->
                    formData = getFormData form
                    validateName form, formData, name, validators
                    true

        form.submit (e) ->
            results = self.clientValidate formId
            
            if results.length > 0 
                e.preventDefault()
                showSummary results
                validateElements()
                
                true
            

        

exports.FormValidator = FormValidator
exports.check = check
    
