const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  voter: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  office: {
    type: Schema.Types.ObjectId,
    ref: "offices",
    required: true
  },
  candidate: {
    type: Schema.Types.ObjectId,
    ref: "candidates",
    required: true
  },
  date: { type: Date, default: Date.now() }
});

voteSchema.index({ user: 1, office: 1 }, { unique: true });

module.exports = Vote = mongoose.model("votes", voteSchema);
