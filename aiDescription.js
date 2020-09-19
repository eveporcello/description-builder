const markovText = require("node-markovify").markovText;
const fs = require("fs");
const faker = require("faker");

fs.readFile("./camp.txt", "utf-8", function (err, text) {
  let thisMarkovText = new markovText();
  thisMarkovText.init({
    text,
    stateSize: 4
  });
  const hey = thisMarkovText
    .predict({
      init_state: null,
      max_chars: 200, // do faker 200 - 500
      numberOfSentences: 8, // random 5 - 25
      popularFirstWord: false
    })
    .join("");
  console.log(hey);
});
