"use strict";

const data = require("./TestData.json");

var express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

var app = (module.exports = express());

var corsOptions = {
  origin: "http://localhost:4201",
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));

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
app.get("/wordsList", function (req, res) {
  const wordsList = data.wordList;

  //console.log(returnedData);
  //console.log(adj, noun, verb, adverb);
  res.send(randomizeWords(wordsList));
});

app.post("/rank", function (req, res) {
  const score = JSON.parse(JSON.stringify(req.body)).score;
  console.log(score);
  const rank = getRank(score);
  console.log(rank);
  res.send(rank);
});
/* istanbul ignore next */
if (!module.parent) {
  app.listen(3080);
  console.log("Express started on port 3080");
}
