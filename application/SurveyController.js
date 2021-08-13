const RequestIp = require("@supercharge/request-ip");
const Survey = require("./Survey");
const Input = require("./Input");
const data = require("./../data/input.json");
require("dotenv").config();
const uploadSurvey = async (req, res) => {
  try {
    const ip = RequestIp.getClientIp(req);
    req.body.ip = ip;
    if (req.body?.data?.code) {
      await Survey.findOneAndUpdate({ 'data.code': req.body.data.code }, req.body, {
        upsert: true,
      });
    } else {
      const survey = new Survey(req.body);
      await survey.save();
    }

    return res.status(200).send({
      data: req.body,
    });
  } catch (error) {
    return res.status(500).send({
      message: "something went wrong",
      stack: error.message,
    });
  }
};

const getSurvey = async (req, res) => {
  try {
    const surveys = await Survey.find({}).sort([["updatedAt", "-1"]]);
    return res.status(200).send({
      data: surveys,
    });
  } catch (error) {
    return res.status(500).send({
      message: "something went wrong",
      stack: error.message,
    });
  }
};

const getIpVaildation = async (req, res) => {
  try {
    const ip = RequestIp.getClientIp(req);
    if (process.env.IP_VALIDATION !== "true") {
      res.status(200).send({
        data: false,
      });
    } else {
      const result = await Survey.find({ ip: ip }).lean();
      if (result.length > 0) {
        res.status(200).send({
          data: true,
        });
      } else {
        res.status(200).send({
          data: false,
        });
      }
    }
  } catch (error) {
    return res.status(500).send({
      message: "something went wrong",
      stack: error.message,
    });
  }
};

const getNumber = (callback) => {
  var n = Math.floor(Math.random() * 1000000);
  return new Promise(function (resolve, reject) {
    Survey.findOne({ "data.code": n }, function (err, result) {
      if (err) {
        reject(err);
      } else if (result) return getNumber(callback);
      else {
        resolve(n);
      }
    });
  });
};

const getRandomUniqueId = async (req, res) => {
  try {
    const uniqueNumber = await getNumber();
    const ip = RequestIp.getClientIp(req);
    const survey = new Survey({
      ip,
      data: {
        code: uniqueNumber,
      },
    });
    await survey.save();
    res.status(200).send({
      data: uniqueNumber,
    });
  } catch (error) {
    return res.status(500).send({
      message: "something went wrong",
      stack: error.message,
    });
  }
};

const getInput = async (req, res) => {
  try {
    const result = await Input.findOne({}, {}, { sort: { updatedAt: 1 } });
    if (!result) {
      const input = new Input(data);
      await input.save();
      res.json(data);
      return;
    }
    res.json(result);
  } catch (error) {
    res.json(data);
  }
};

module.exports = {
  getSurvey,
  uploadSurvey,
  getIpVaildation,
  getRandomUniqueId,
  getInput,
};
