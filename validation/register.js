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
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  return data;
}

const validateName = (errors, data) => {
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  return errors;
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

const validatePassword2 = (errors, data) => {
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return errors;
}

const checkInputDataForErrors = (errors, data) => {
  errors = validateName(errors, data);
  errors = validateEmail(errors, data);
  errors = validatePassword(errors, data);
  errors = validatePassword2(errors, data);

  return errors;
}