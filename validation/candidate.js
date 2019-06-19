const lodash = require('lodash');




module.exports = function validateCandidateInput(data) {
    let errors = {}

    data.user = !lodash.isEmpty(data.user) ? data.user : ""
    data.party = !lodash.isEmpty(data.party) ? data.party : ""
    data.office = !lodash.isEmpty(data.office) ? data.office : ""

    if(lodash.isEmpty(data.user)){
        errors.user = "please choose a valid user for the candidate"
    }
    if(lodash.isEmpty(data.party)){
        errors.party = "please choose a valid party for the candidate"
    }
    if(lodash.isEmpty(data.office)){
        errors.office = "please choose a valid office for the candidate"
    }

    return {
        errors,
        isValid:lodash.isEmpty(errors)
    }
}