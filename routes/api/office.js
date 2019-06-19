const express = require('express');
const passport = require('passport');
const Office = require('../../models/Office');
const validateOfficeInput = require('../../validation/office');

const app = express();

//create office route
//api/office/register
app.post('/register',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(!req.user.isAdmin){
        return res.status(401).json({admin:'only admins are allowed to create an office'})
    }
    const {errors,isValid} = validateOfficeInput(req.body)
    if(!isValid){
        return res.status(400).json(errors);
    }
    req.body.name = req.body.name.toLowerCase();
    const newOffice = new Office(req.body);
    newOffice.save()
        .then(office=>{
            return res.json(office)
        })
        .catch(err=>{
            return res.status(400).json({office_type:'office type is one of legislative, federal, state or local government and office name unique'})

        })
})

//update office route
//api/office/:id
app.put('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(!req.user.isAdmin){
        return res.status(401).json({admin:'only admins are allowed to update an office'})
    }
    const {errors,isValid} = validateOfficeInput(req.body)
    if(!isValid){
        return res.status(400).json(errors);
    }

    req.body.name = req.body.name.toLowerCase();
    Office.findByIdAndUpdate(req.params.id,req.body)
        .then(office=>{
            return res.json(office)
        })
        .catch(err=>{
            return res.status(400).json({office_type:'make sure office name is unique and office type is one of legislative, federal, state or local government'})

        })

   
})

//get all offices route
//api/office/all
app.get('/all',(req,res)=>{
    Office.find()
        .then(offices=>{
            return res.json(offices)
        })
        .catch(err=>console.log(err))
})

//get office by id
//api/office/:id
app.get('/:id',(req,res)=>{
    Office.findById(req.params.id)
        .then(office=>{
            return res.json(office)
        })
        .catch(()=>{
            return res.status(400).json({id:'office with the given id does not exist'})
        })
})

//delete office
//api/office/:id
app.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let errors = {}
    if(!req.user.isAdmin){
        errors.admin = 'only admins are allowed to delete offices'
        return res.status(401).json(errors)
    }
    
    Office.findByIdAndDelete(req.params.id)
        .then(office=>{
            if(office){
               return res.json(office) 
            }
            else{
                errors.id = "office with the given id does not exist"
                return res.status(400).json(errors)
            }
            
        })
        .catch((err)=>{
            
            console.log(err)
            
        })
})

module.exports = app