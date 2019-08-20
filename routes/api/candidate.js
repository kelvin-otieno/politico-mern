const express = require("express");
const passport = require("passport");
const lodash = require("lodash");
const Candidate = require("../../models/Candidate");
const User = require("../../models/User");
const Party = require("../../models/Party");
const Office = require("../../models/Office");
const app = express();
const validateCandidateInput = require("../../validation/candidate");

//create candidate route
//api/candidate/register
app.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { errors, isValid } = validateCandidateInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    if (!req.user.isAdmin) {
      errors.admin = "Only admins are allowed to register candidates";
      return res.status(401).json(errors);
    }



   
    Candidate.find({ user: req.body.user }).then(candidate => {
      if (candidate.length > 0) {
        errors.user = "a user cannot register more than once";
        return res.status(400).json(errors);
      } else {
        const newCandidate = new Candidate(req.body);
        newCandidate
          .save()
          .then(candidate => {
            return res.json(candidate);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
);

//get all candidates route
//api/candidate/all
app.get("/all", (req, res) => {
  Candidate.find()
    .populate("user", "firstname lastname othername -_id")
    .populate("office", "name -_id")
    .populate("party", "name -_id")
    .then(candidates => {
      return res.json(candidates);
    })
    .catch(err => console.log(err));
});


//get candidate by id
//api/candidate/:id
app.get('/:id',(req,res)=>{
    let errors = {}
    Candidate.findById(req.params.id)
        .then(candidate=>{
            return res.json(candidate)
        })
        .catch(err=>{
            errors.id = "kindly ensure that you have provided the correct id"
            return res.status(400).json(errors)
        })
})


//update candidate route
//api/candidate/:id
app.put('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(!req.user.isAdmin){
        return res.status(401).json({admin:'only admins are allowed to update an office'})
    }
    const {errors,isValid} = validateCandidateInput(req.body)
    if(!isValid){
        return res.status(400).json(errors);
    }

    
    Candidate.findByIdAndUpdate(req.params.id,req.body)
        .then(candidate=>{
            return res.json(candidate)
        })
        .catch(err=>{
            console.log(err)

        })

   
})

//delete candidate
//api/candidate/:id
app.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let errors = {}
    if(!req.user.isAdmin){
        errors.admin = 'only admins are allowed to delete candidates'
        return res.status(401).json(errors)
    }
    
    Candidate.findByIdAndDelete(req.params.id)
        .then(candidate=>{
            if(candidate){
               return res.json(candidate) 
            }
            else{
                errors.id = "candidate with the given id does not exist"
                return res.status(400).json(errors)
            }
            
        })
        .catch((err)=>{
            
            console.log(err)
            
        })
})



module.exports = app;
