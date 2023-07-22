// Create a web server
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

// Set up the view engine
app.set('view engine', 'ejs');

// Set up the static files
app.use(express.static('public'));

// Set up the body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the routes
app.get('/', function(req, res) {
    res.render('home');
});

app.get('/results', function(req, res) {
    // Get the search term from the form
    let searchTerm = req.query.search;
    // Make a request to the OMDB API
    request(`http://www.omdbapi.com/?apikey=thewdb&s=${searchTerm}`, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            let data = JSON.parse(body);
            res.render('results', { data: data });
        }
    });
});

// Start the server
app.listen(3000, function() {
    console.log('Server started on port 3000');
});