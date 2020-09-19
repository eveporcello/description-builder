const faker = require("faker");
const randomLocation = require("random-location");
const markovText = require("node-markovify").markovText;
const fs = require("fs");

const counselorIds = [
  "jlengstorf",
  "tayiorbeii",
  "andrewdelprete",
  "moontahoe",
  "kentcdodds",
  "jsjoeio",
  "joelhooks",
  "eveporcello",
  "kyleshevlin",
  "knitcodemonkey",
  "tlakomy",
  "dabit3",
  "shrutikapoor08",
  "mannisaac",
  "tgrecojs",
  "laurosilvacom",
  "joshwcomeau",
  "saravieira",
  "maggieappleton",
  "cmgorton",
  "vojtaholik",
  "theianjones",
  "domitriusanthony",
  "wjohnson85"
];

const activityTypes = [
  {
    type: "SPORTS",
    activities: [
      "baseball",
      "football",
      "softball",
      "golfing",
      "frisbee"
    ]
  },
  {
    type: "NATURE",
    activities: [
      "hiking",
      "swimming",
      "mountain biking",
      "skiing",
      "bird watching",
      "mushroom foraging"
    ]
  },
  {
    type: "GAMES",
    activities: ["scrabble", "canasta", "tag"]
  },
  {
    type: "ARTSCRAFTS",
    activities: ["boondoggling", "basketweaving", "singing"]
  }
];

function randomCategory() {
  return faker.random.arrayElement([
    "NATURE",
    "SPORTS",
    "GAMES",
    "ARTSCRAFTS"
  ]);
}

function description(obj) {
  const firstSentences = [
    `Nothing can prepare you for the thrill of ${obj.name}.`,
    `Ascend to new heights when you join the fun at ${obj.name}.`,
    `This ${obj.day}, prepare to have the most fun of your life.`,
    `Don't get a case of the ${obj.day}s.`,
    `Do you like participating in activities where most of the equipment is safe most of the time? Then you'll love ${obj.name}`,
    `You didn't register for ${obj.name} yet? It'd be a lot cooler if you did!`
  ];
  return `${faker.random.arrayElement(
    firstSentences
  )} ${faker.random.arrayElement(
    secondSentences
  )} ${faker.random.arrayElement(thirdSentences)}`;
}

function activityBuilder() {
  const category = randomCategory();
  const found = activityTypes.find((obj) => obj.type === category);
  const activityObject = {
    type: found.type,
    activity: faker.random.arrayElement(found.activities),
    id: faker.random.uuid()
  };
  const completeObject = {
    ...activityObject,
    name: activityObject.activity,
    photo: {
      thumb: `https://source.unsplash.com/200x200/?${activityObject.activity}`,
      full: `https://source.unsplash.com/900x600/?${activityObject.activity}`
    },
    location: randomLocation.randomCirclePoint(
      {
        latitude: "39.0968",
        longitude: "-120.0324"
      },
      20000 // in meters
    ),
    counselor: faker.random.arrayElement(counselorIds),
    day: faker.random.arrayElement([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ])
  };
  return {
    ...completeObject,
    description: description(completeObject)
  };
}

console.log(activityBuilder());
