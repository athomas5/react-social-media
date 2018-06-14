const validator = require('validator');
const isEmpty = require('../utils/utils').isEmpty;

module.exports = function validateProfileInput(data) {
  let errors = {};

  data = convertMissingInputToEmptyString(data);
  errors = checkProfileDataForErrors(errors, data);

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

const convertMissingInputToEmptyString = data => {
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';
  
  return data;
}

const validateHandle = (errors, data) => {
  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to be between 2 and 4 characters long';
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle field is required';
  }

  return errors;
}

const validateStatus = (errors, data) => {
  if (validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  return errors;
}

const validateSkills = (errors, data) => {
  if (validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }

  return errors;
}

const validateURLS = (errors, data) => {
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  return errors;
}

const checkProfileDataForErrors = (errors, data) => {
  errors = validateHandle(errors, data);
  errors = validateStatus(errors, data);
  errors = validateSkills(errors, data);
  errors = validateURLS(errors, data);

  return errors;
}