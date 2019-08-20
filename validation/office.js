const lodash = require("lodash");
const Validator = require("validator");

module.exports = function validateOfficeInput(data) {
  let errors = {};

  data.name = !lodash.isEmpty(data.name) ? data.name : "";
  data.office_type = !lodash.isEmpty(data.office_type) ? data.office_type : "";


if(!Validator.isLength(data.name,{min:2,max:15})){
    errors.name = "name should be between 2 and 15 characters"
}

  if (lodash.isEmpty(data.name)) {
    errors.name = "name is required";
  }

  if (lodash.isEmpty(data.office_type)) {
    errors.office_type = "office type is required";
  }

 

  return { errors, isValid: lodash.isEmpty(errors) };
};