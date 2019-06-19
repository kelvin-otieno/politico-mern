const lodash = require("lodash");
const Validator = require("validator");

module.exports = function validatePetitionInput(data) {
  let errors = {};

  data.user = !lodash.isEmpty(data.user) ? data.user : "";
  data.office = !lodash.isEmpty(data.office) ? data.office : "";
  data.comment = !lodash.isEmpty(data.comment) ? data.comment : "";

  if (lodash.isEmpty(data.user)) {
    errors.user = "provide user id";
  }
  if (lodash.isEmpty(data.office)) {
    errors.office = "provide office id";
  }

  if (!Validator.isLength(data.comment, { min: 6, max: 300 })) {
    errors.comment = "comments should be between 6 and 300 characters";
  }

  if (lodash.isEmpty(data.comment)) {
    errors.comment = "comment cannot be empty";
  }

  return {
    errors,
    isValid: lodash.isEmpty(errors)
  };
};
