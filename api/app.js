"use strict";
//importing the words
const data = require("./TestData.json");

// importing express, body parser to parse data from requests and cors to allow cors
var express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var app = (module.exports = express());
var corsOptions = {
  origin: "http://127.0.0.1:4201",
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));

//this function is used to generate random 10 words from a given list of words
//also the returned 10 words must have 1 noun, 1 adj, 1 verb and 1 adverb
function randomizeWords(data) {
  const returnedData = [];
  const selectedRandomId = [];

  const adj = data.filter((item) => item.pos === "adjective");
  const noun = data.filter((item) => item.pos === "noun");
  const verb = data.filter((item) => item.pos === "verb");
  const adverb = data.filter((item) => item.pos === "adverb");

  const randomAdj = adj[Math.floor(Math.random() * adj.length)];
  const randomNoun = noun[Math.floor(Math.random() * noun.length)];
  const randomVerb = verb[Math.floor(Math.random() * verb.length)];
  const randomAdverb = adverb[Math.floor(Math.random() * adverb.length)];

  returnedData.push(randomAdj);
  selectedRandomId.push(randomAdj.id);
  returnedData.push(randomNoun);
  selectedRandomId.push(randomNoun.id);
  returnedData.push(randomVerb);
  selectedRandomId.push(randomVerb.id);
  returnedData.push(randomAdverb);
  selectedRandomId.push(randomAdverb.id);

  var filtered = data.filter(function (value, index, arr) {
    return !selectedRandomId.includes(value.id);
  });

  var shuffled = filtered.sort(function () {
    return 0.5 - Math.random();
  });

  var selected = shuffled.slice(0, 6);

  const returnedDataEdited = returnedData.concat(selected);

  return returnedDataEdited;
}

//This function is used to return a rank when a score is given
function getRank(score) {
  const scoresList = data.scoresList;
  scoresList.sort();
  let count = 0;
  for (const i in scoresList) {
    if (scoresList[i] < score) {
      count += 1;
    }
  }

  return ((count / scoresList.length) * 100).toFixed(2);
}

app.get("/", function (req, res) {
  console.log("Hello there");
  res.send(data);
});

//this route handles get request to get the words
app.get("/wordsList", function (req, res) {
  const wordsList = data.wordList;

  //console.log(returnedData);
  //console.log(adj, noun, verb, adverb);
  res.send(randomizeWords(wordsList));
});
//this route handles post requests to get the rank given the score
app.post("/rank", function (req, res) {
  const score = JSON.parse(JSON.stringify(req.body)).score;
  console.log(score);
  const rank = getRank(score);
  console.log(rank);
  res.send(rank);
});
//initializing the app
if (!module.parent) {
  app.listen(3080);
  console.log("Express started on port 3080");
}
