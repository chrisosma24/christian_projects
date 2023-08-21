const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const _ = require("lodash");

var mmain = "";
var description = "";
var temperature = "";
var humidity = "";
var windSpeed = "";
var direction = "";
var imageSource = "";
var windImage = "";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", function(req, res) {
  res.render("index", {weatherMain: mmain, weatherDescription: description, temperatureSectionImage: imageSource, locationTemp: temperature, locationHum: humidity, speed: windSpeed, windDirection: direction, windSectionImage: windImage});
});

app.post("/", function(req, res){
  const country = req.body.city;
  console.log(country);

  const api = '2e64d65be4b4f2e58848959b5400019b';
  https.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${api}`, function(response){
    response.on("data", function(data){
      const jsonData = JSON.parse(data);
      const {weather, main, wind} = jsonData;
      mmain = weather[0].main;
      description = "description: " + weather[0].description;
      const tempTemperature = 1.8 * (main.temp-273) + 32;
      temperature = tempTemperature.toFixed(2) + "° F";
      humidity = "humidity: " + main.humidity + " %";
      windSpeed = "Speed: " + wind.speed + " meter / sec";
      direction = "direction: " + wind.deg + " degrees";
      imageSource = '';
      windImage = 'images/wind-removebg-preview.png';

      if (temperature < 277){
        imageSource = 'images/cold-removebg-preview.png';
      } else if (temperature < 288){
        imageSource = 'images/chilly-removebg-preview.png'
      } else if (temperature < 300) {
        imageSource = 'images/cool-removebg-preview.png';
      } else{
        imageSource = "images/sunny-removebg-preview.png";
      }

      res.redirect("/");

    })
  });

});

app.listen(3000, function() {
  console.log("Port 3000 is being used!");
})
