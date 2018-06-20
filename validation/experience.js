const validator = require('validator');
const isEmpty = require('../utils/utils').isEmpty;

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data = convertMissingInputToEmptyString(data);
  errors = checkUserDataForErrors(errors, data);

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

const convertMissingInputToEmptyString = data => {
  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  return data;
}

const validateTitle = (errors, data) => {
  if (validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  return errors;
}

const validateCompany = (errors, data) => {
  if (validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }

  return errors;
}

const validateFrom = (errors, data) => {
  if (validator.isEmpty(data.from)) {
    errors.from = 'From field is required';
  }

  return errors;
}

const checkUserDataForErrors = (errors, data) => {
  errors = validateTitle(errors, data);
  errors = validateCompany(errors, data);
  errors = validateFrom(errors, data);

  return errors;
}