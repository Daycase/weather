const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const request = require('request');
const apiKey = 'be5b3bf2d4f8548170028a7ce27e57c7';


app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.render('index.ejs', {weather: null, error: null});
});

app.post('/', function(req, res) {
    let city = req.body.city;
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}';
    request(url, function( err, response, body) {
        if (err) {
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body);
            console.log(weather);
            if (weather.main == undefined) {
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = 'It is ${weather.main.temp} degrees in ${weather.name}!';
                res.render('index', {weather: weatherText, error: null});
            }
        }
    })
});

app.listen(3000, function() {
    console.log('App listening on port 3000')
});