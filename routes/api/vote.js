const express = require("express");
const passport = require("passport");
const Vote = require("../../models/Vote");
const Candidate = require("../../models/Candidate");
const Office = require("../../models/Office");
const User = require("../../models/User");
const validateVoteInput = require("../../validation/vote");

const app = express();

//voting route
//api/vote/
app.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateVoteInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const newVote = new Vote(req.body);
    newVote
      .save()
      .then(vote => {
        res.json({ success: "Congratulations on casting your vote" });
      })
      .catch(err => {
        console.log(err);
        errors.vote = "you can only vote once for a particular office";
        res.status(400).json(errors);
      });
  }
});

//get votes
//api/vote/all
app.get("/all", (req, res) => {
  Vote.find()
    .populate({
      path: "candidate",
      select: "-date -office",
      populate: { path: "user", select: "firstname lastname othername" }
    })
    .populate({
      path: "candidate",
      select: "party",
      populate: { path: "party", select: "name" }
    })
    .populate("office", "name")
    .populate("voter", "firstname othername lastname")
    .then(votes => {
      return res.json(votes);
    })
    .catch(err => {
      console.log(err);
    });
});

//count votes
//api/vote/tally
app.get("/tally", async function(req, res) {
  let votesList = await getCandidateVotes();
  const data = await getVoteData();
  let overallList = {
    registered_voters: data[0].registered_voters,
    voter_turnout: data[0].voter_turnout
  };
  overallList.percentage =
    (overallList.voter_turnout / overallList.registered_voters) * 100;
  res.json({ individual: votesList, overall: overallList });
});

async function getCandidateVotes() {
  let candidatesList = await getCandidates();
  let data = await getVoteData();
  let votesList = [];
  await Promise.all(
    candidatesList.map(async function(candidate) {
      const { _id, user, party, office } = candidate;
      const office_name = office.name;
      const votes_casted = data[0].office_votes[office_name];
      let vote = {
        _id,
        user,
        party,
        office,
        votes_casted,
        votes: 0,
        percentage: 0
      };
      vote.votes = await getVotes(candidate._id);
      vote.percentage = (vote.votes / vote.votes_casted) * 100;
      votesList.push(vote);
    })
  );

  return Promise.all(votesList);
}

async function getVotes(candidate) {
  let votes = await Vote.find({ candidate })
    .then(votes => {
      return votes.length;
    })
    .catch(err => console.log(err));

  return votes;
}

async function getCandidates() {
  let candidates = await Candidate.find()
    .populate("user", "firstname lastname othername passportUrl -_id")
    .populate("office", "name -_id")
    .populate("party", "name -_id")
    .then(candidates => {
      return candidates;
    })
    .catch(err => console.log(err));
  return candidates;
}

async function getVoteData() {
  let voteData = { office_votes: {}, registered_voters: 0, voter_turnout: 0 };
  let office_votes = {};
  const registered_voters = await User.find().then(users => users.length);

  const offices = await Office.find()
    .then(offices => offices)
    .catch(err => console.log(err));

  Promise.all(
    offices.map(async function(office) {
      office_votes[office.name] = await Vote.find({ office })
        .then(offices => offices.length)
        .catch(err => console.log(err));
    })
  );

  await Vote.find().distinct("voter", (err, votes) => {
    if (err) {
      console.log(err);
      return;
    } else {
      voteData.voter_turnout = votes.length;
    }
  });

  voteData.office_votes = office_votes;
  voteData.registered_voters = registered_voters;
  return Promise.all([voteData]);
}

module.exports = app;
