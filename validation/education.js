const validator = require('validator');
const isEmpty = require('../utils/utils').isEmpty;

module.exports = function validateEducationInput(data) {
  let errors = {};

  data = convertMissingInputToEmptyString(data);
  errors = checkInputDataForErrors(errors, data);

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

const convertMissingInputToEmptyString = data => {
  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  return data;
}

const validateSchool = (errors, data) => {
  if (validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }

  return errors;
}

const validateDegree = (errors, data) => {
  if (validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }

  return errors;
}

const validateFieldofStudy = (errors, data) => {
  if (validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = 'Field of Study field is required';
  }

  return errors;
}

const validateFrom = (errors, data) => {
  if (validator.isEmpty(data.from)) {
    errors.from = 'From field is required';
  }

  return errors;
}

const checkInputDataForErrors = (errors, data) => {
  errors = validateSchool(errors, data);
  errors = validateDegree(errors, data);
  errors = validateFieldofStudy(errors, data);
  errors = validateFrom(errors, data);

  return errors;
}