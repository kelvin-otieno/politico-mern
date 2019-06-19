const express = require("express");
const passport = require("passport");
const validatePetitionInput = require("../../validation/petition");
const Petition = require("../../models/Petition");

const app = express();

//create petition route
//api/petition/register
app.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePetitionInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      const newPetition = new Petition(req.body);
      newPetition
        .save()
        .then(petition => {
          return res.json(petition);
        })
        .catch(err => console.log(err));
    }
  }
);

//get all petitions
//api/petition/all
app.get("/all", (req, res) => {
  Petition.find()
    .populate('user','firstname lastname')
    .populate('office','name')
    .then(petitions => {
      res.json(petitions);
    })
    .catch(err => console.log(err));
});

module.exports = app;
