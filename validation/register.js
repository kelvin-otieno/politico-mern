const lodash = require("lodash");
const Validator = require("validator");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstname = !lodash.isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !lodash.isEmpty(data.lastname) ? data.lastname : "";
  data.email = !lodash.isEmpty(data.email) ? data.email : "";
  data.phoneNumber = !lodash.isEmpty(data.phoneNumber) ? data.phoneNumber : "";
  data.password = !lodash.isEmpty(data.password) ? data.password : "";
  data.password2 = !lodash.isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isAlpha(data.firstname)) {
    errors.firstname = "firstname must be only letters";
  }

  if (!Validator.isLength(data.firstname, { min: 2, max: 30 })) {
    errors.firstname = "firstname must be between 2 and 30 characters";
  }

  if (lodash.isEmpty(data.firstname)) {
    errors.firstname = "firstname is required";
  }

  if (data.othername !== undefined) {
    data.othername = !lodash.isEmpty(data.othername) ? data.othername : "";
    if (!Validator.isAlpha(data.othername)) {
      errors.othername = "othername must be only letters";
    }
    if (!Validator.isLength(data.othername, { min: 2, max: 30 })) {
      errors.othername = "othername must be between 2 and 30 characters";
    }
  }

  if (!Validator.isAlpha(data.lastname)) {
    errors.lastname = "lastname must be only letters";
  }

  if (!Validator.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.lastname = "lastname must be between 2 and 30 characters";
  }

  if (lodash.isEmpty(data.lastname)) {
    errors.lastname = "lastname is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Provide a valid email address";
  }

  if (lodash.isEmpty(data.email)) {
    errors.email = "email is required";
  }

  if (
    !Validator.isNumeric(data.phoneNumber) ||
    !Validator.isLength(data.phoneNumber, { min: 10, max: 10 })
  ) {
    errors.phoneNumber = "Provide a valid phone number";
  }

  if (lodash.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = "phoneNumber is required";
  }

  if (
    !Validator.matches(
      data.password,
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"
    )
  ) {
    errors.password = "Weak Password";
  }

  if (lodash.isEmpty(data.password)) {
    errors.password = "password is required";
  }

  if (data.password2 !== data.password) {
    errors.password2 = "passwords not matching";
  }

  if (lodash.isEmpty(data.password2)) {
    errors.password2 = "confirm password is required";
  }

  return { errors, isValid: lodash.isEmpty(errors) };
};
