const lodash = require("lodash");
const Validator = require("validator");

module.exports = function validatePartyInput(data) {
  let errors = {};

  data.name = !lodash.isEmpty(data.name) ? data.name : "";
  data.hqAddress = !lodash.isEmpty(data.hqAddress) ? data.hqAddress : "";
  data.logoUrl = !lodash.isEmpty(data.logoUrl) ? data.logoUrl : "";

if(!Validator.isLength(data.name,{min:2,max:15})){
    errors.name = "name should be between 2 and 15 characters"
}

  if (lodash.isEmpty(data.name)) {
    errors.name = "name is required";
  }

  if (lodash.isEmpty(data.hqAddress)) {
    errors.hqAddress = "hqAddress is required";
  }

  if (lodash.isEmpty(data.logoUrl)) {
    errors.logoUrl = "logoUrl is required";
  }

  return { errors, isValid: lodash.isEmpty(errors) };
};