const lodash = require('lodash');

module.exports = function validateVoteInput(data){
    let errors = {}
    data.voter = !lodash.isEmpty(data.voter) ? data.voter : "";
    data.office = !lodash.isEmpty(data.office) ? data.office : "";
    data.candidate = !lodash.isEmpty(data.candidate) ? data.candidate : "";

    if(lodash.isEmpty(data.voter)){
        errors.voter = "voter id missing"
    }
    if(lodash.isEmpty(data.office)){
        errors.office = "office id missing"
    }
    if(lodash.isEmpty(data.candidate)){
        errors.candidate = "candidate id missing"
    }

    return {
        errors,
        isValid:lodash.isEmpty(errors)
    }
}