const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const Survey = require("./application/SurveyController");

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
mongoose.connection.on("error", function (error) {
    console.log("error", error);
});
mongoose.connection.once("open", function () {
    console.log("db connected");
});

let cachedContent = {};
// middlewares
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "no-cache");
    next();
});
app.use(express.static(path.join(__dirname, "build")));

app.post("/upload", Survey.uploadSurvey);
app.get("/response", Survey.getSurvey);
app.get("/input", Survey.getInput);
app.get("/ipvalidate", Survey.getIpVaildation);
app.get("/unique-id", Survey.getRandomUniqueId);

app.disable("etag");
// frontend deployment
app.get("/", (req, res) => {
    res.header("Cache-Control", "max-age=-1");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res.sendFile(path.join(__dirname, "build/index.html"));
});

// setting up the PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server is listening at PORT ${PORT}`));
