const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petitionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref:'users',
    required: true
  },
  office: {
    type: Schema.Types.ObjectId,
    ref:'offices',
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Petition = mongoose.model("petitions", petitionSchema);
