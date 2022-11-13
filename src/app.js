const express = require("express");
const res = require("express/lib/response");
const { dirname } = require("path");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index.hbs", {
    title: "Weather App",
    name: "Matt",
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    title: "About Me",
    name: "Matt",
  });
});

app.get("/help", (req, res) => {
  res.render("help.hbs", {
    title: "Help Page",
    name: "Matt",
    message: "Click on weather to see the weather in your area. For JSON, you can request from the /weather page.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  const address = req.query.address;

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      return res.send({
        Location: location,
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", () => {
  res.send({});
});

app.get("/help/*", (req, res) => {
  res.render("404.hbs", {
    title: "404",
    message: "Help article not found",
    name: "Matt",
  });
});

app.get("*", (req, res) => {
  res.render("404.hbs", {
    title: "404",
    message: "Page not found.",
    name: "Matt",
  });
});

const port = 3000;
app.listen(port, () => {});
