const lodash = require("lodash");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !lodash.isEmpty(data.email) ? data.email : "";
  data.password = !lodash.isEmpty(data.password) ? data.password : "";

  if (lodash.isEmpty(data.email)) {
    errors.email = "email is required";
  }

  if (lodash.isEmpty(data.password)) {
    errors.password = "password is required";
  }

  return { errors, isValid: lodash.isEmpty(errors) };
};
