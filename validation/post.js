const validator = require('validator');
const isEmpty = require('../utils/utils').isEmpty;

module.exports = function validatePostInput(data) {
  let errors = {};

  data = convertMissingInputToEmptyString(data);
  errors = checkInputDataForErrors(errors, data);

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

const convertMissingInputToEmptyString = data => {
  data.text = !isEmpty(data.text) ? data.text : '';

  return data;
}

const validateText = (errors, data) => {
  if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 10 and 300 characters long';
  }

  if (validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return errors;
}

const checkInputDataForErrors = (errors, data) => {
  errors = validateText(errors, data);

  return errors;
}