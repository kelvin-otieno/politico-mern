const express = require('express');
const passport = require('passport');
const validatePartyInput = require('../../validation/party');
const Party = require('../../models/Party');
const app = express();

//create party route
//api/party/register
app.post('/register',passport.authenticate('jwt',{session:false}),(req,res) => {
    
    if(!req.user.isAdmin){
       return res.status(401).json({admin:"only admins can create a party"})
    }

    const {errors,isValid} = validatePartyInput(req.body)
    if(!isValid){
        return res.status(400).json(errors)
    }else{
        const {hqAddress,logoUrl} = req.body;
        const name = req.body.name.toLowerCase();
        Party.findOne({name})
            .then((party)=>{
                if(party){
                  errors.name = "A party with that name already exists"
                return res.status(400).json(errors)  
                }
                else{
                    const newParty = new Party({name,hqAddress,logoUrl})
                    newParty.save()
                        .then((party)=>{return res.json(party)})
                        .catch((err)=>{console.log(err)})
                }
                })
            .catch((err)=>console.log(err))
    }

    
})

//get all parties
//api/party/all
app.get('/all',(req,res) => {
    Party.find()
        .then((parties)=> {
            return res.json(parties)
        })
        .catch(err=>console.log(err))
})

//get party by id
//api/party/:id
app.get('/:id',(req,res) => {
    let errors = {}
    const id = req.params.id
    Party.findById(id)
        .then(party=>{
            if(party){
                return res.json(party)
            }
            
        })
        .catch(err=>{
             errors.id = "party with the supplied id doesn't exist"
                return res.status(400).json(errors)
        });
})

//edit a party
//api/party/:id
app.put('/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
    
    if(!req.user.isAdmin){
       return res.status(401).json({admin:"only admins can edit a party"})
    }

    const {errors,isValid} = validatePartyInput(req.body)
    if(!isValid){
        return res.status(400).json(errors)
    }
    
    const id = req.params.id
    req.body.name = req.body.name.toLowerCase()
    let {name,hqAddress,logoUrl} = req.body
    Party.findByIdAndUpdate(id,req.body)
        .then(party=>{
            return res.json(party)
        })
        .catch(err=>{
            errors.name = "a party with a similar name already exists"
            return res.status(400).json(errors)
        })
})

//delete a party
//api/party/:id
app.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let errors = {}
    if(!req.user.isAdmin){
        errors.admin = "only admins are allowed to delete parties"
        return res.status(401).json(errors)
    }
    
    Party.findByIdAndDelete(req.params.id)
        .then(party => {
            if(party){
                return res.json(party)
            }else{
                errors.id = 'party does not exist'
            return res.status(400).json(errors)
            }

            
        })
        .catch(err=>{
            console.log(err)
        })
})

module.exports = app

