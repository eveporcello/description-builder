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
    `When the going gets weird, the weird ${
      obj.type === "NATURE" || "ARTSCRAFTS" ? "go" : "play"
    } ${obj.name}.`,
    `By failing to prepare for ${obj.name}, you are preparing to fail at ${obj.name}.`,
    `Ask not what ${obj.name} can do for you. Ask what you can do for ${obj.name}.`
  ];
  const secondSentences = [
    `This ${obj.day}, prepare to have the most fun of your life.`,
    `Don't get a case of the ${obj.day}s.`,
    `Fear is a myth. FOMO is real.`
  ];
  const thirdSentences = [
    `Register now. Most of the equipment is safe most of the time.`,
    `You didn't register yet? It'd be a lot cooler if you did!`,
    `Sign up now. Your future depends on it.`
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
