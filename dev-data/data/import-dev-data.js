const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Questionnaire = require("./../../models/QuestionnareModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose.connect(DB).then((con) => {
  console.log("DB connection successful");
});

const questionare = JSON.parse(
  fs.readFileSync(`${__dirname}/questionare.json`, "utf-8")
);

const importData = async () => {
  try {
    await Questionnaire.create(questionare);
    console.log("Data successfully loaded");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//delete all data from DB
const deleteData = async () => {
  try {
    await Questionnaire.deleteMany();
    console.log("Data successfully deleted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
console.log(process.argv);
