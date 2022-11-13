request = require("request");
require("dotenv").config();
weatherStackAccess = process.env.weatherStackToken;
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/forecast?access_key=" +
    weatherStackAccess +
    "&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";
  console.log(url);
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weatherstac", undefined);
    } else if (body.error) {
      callback("could not find location", undefined);
    } else {
      callback(undefined, "Feels like: " + body.current.feelslike);
    }
  });
};

module.exports = forecast;
