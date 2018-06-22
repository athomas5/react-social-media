const validator = require('validator');
const isEmpty = require('../utils/utils').isEmpty;

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data = convertMissingInputToEmptyString(data);
  errors = checkInputDataForErrors(errors, data);

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

const convertMissingInputToEmptyString = data => {
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  return data;
}

const validateEmail = (errors, data) => {
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  return errors;
}

const validatePassword = (errors, data) => {
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters';
  }

  return errors;
}

const checkInputDataForErrors = (errors, data) => {
  errors = validateEmail(errors, data);
  errors = validatePassword(errors, data);

  return errors;
}