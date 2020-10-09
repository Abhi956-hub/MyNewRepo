// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/fonts', express.static(__dirname + 'public/fonts'))

// use res.render to load up an ejs view file

// index page
// app.get('/', function(req, res) {
//     res.render('pages/index');
// });

app.get('/home', function(req, res) {
    res.render('pages/home');
});

// contact page
app.get('/contact', function(req, res) {
    res.render('pages/contact');
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// service page
app.get('/service', function(req, res) {
    res.render('pages/service');
});

// project page
app.get('/project', function(req, res) {
    res.render('pages/project');
});

app.listen(8080);
console.log('8080 is the magic port');