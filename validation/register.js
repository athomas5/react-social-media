const validator = require('validator');
const isEmpty = require('../utils/utils').isEmpty;

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  error = validateName(error, data);
  error = validateEmail(error, data);

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

const validateName = (error, data) => {
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  // if (validator.isEmpty(data.name)) {
  //   errors.name = 'Name field is required';
  // }

  return error;
}

// const validateEmail = (error, data) => {

// }