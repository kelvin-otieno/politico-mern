const express = require("express");
const user = require("./routes/api/user");
const party = require("./routes/api/party");
const office = require("./routes/api/office");
const candidate = require("./routes/api/candidate");
const vote = require("./routes/api/vote");
const petition = require("./routes/api/petition");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require('passport');

const app = express();

const conString = require("./config/keys").mongoURI;
mongoose
  .connect(conString)
  .then(() => console.log("DB Connected Successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//initialise passport
app.use(passport.initialize());

require('./config/passport')(passport);



app.get("/", (req, res) => {
  res.send("Application working");
});

app.use("/api/user", user);
app.use("/api/party", party);
app.use("/api/office", office);
app.use("/api/candidate", candidate);
app.use("/api/vote", vote);
app.use("/api/petition", petition);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`listening on port ${port}`));
