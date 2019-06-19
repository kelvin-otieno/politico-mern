const express = require("express");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const lodash = require("lodash");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const app = express();
// const router = app.router();

app.get("/test", (req, res) => {
  res.send("testing user route");
});

//api/user/register
//route to register user
app.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = "A user with that email exists"
        res.status(400).json(errors);
      } else {
        const {
          firstname,
          lastname,
          othername,
          email,
          phoneNumber,
          password
        } = req.body;
        const passportUrl = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

        const newUser = new User({
          firstname,
          lastname,
          othername,
          email,
          phoneNumber,
          passportUrl,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            throw err;
          } else {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          }
        });
      }
    })
    .catch(err => console.log(err));
});



//api/user/login
//route to login user
app.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              //payload
              const payload = {
                id: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
                passportUrl: user.passportUrl,
                firstname: user.firstname,
                lastname: user.lastname
              };
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({ success: true, token: `Bearer ${token}` });
                }
              );
            } else {
              errors.password = "Incorrect password" 
              return res.status(400).json(errors);
            }
          })
          .catch(err => console.log(err));
      } else {
        errors.email = "User with that email does not exist"
        return res
          .status(404)
          .json(errors);
      }
    })
    .catch(err => console.log(err));
});

//api/user/current
//route to get current user
app.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json(req.user);
  }
);

module.exports = app;
