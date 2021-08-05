"use strict";

let express = require('express');
// const flash = require('express-flash');
// const session = require('express-session');
let webApp = express();

//handlebars
const exphbs = require('express-handlebars');

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

//html forms
const bodyParser = require('body-parser');

//helpers
const helpers = require('handlebars-helpers')();

// initialise the flash middleware
// webApp.use(flash());


//make the style in ccs folder visible
webApp.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
webApp.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
webApp.use(bodyParser.json());

webApp.engine('handlebars', handlebarSetup);
webApp.set('view engine', 'handlebars');


const greetings = require('./greetings-app');

const greeting = greetings();

let counter = 0;

//home route
webApp.get('/', function (req, res) {


    //to keep data on the home route
    res.render('index', {
        recordNames: greeting.recordNames(),



    });

})

//greetings route
webApp.post('/greeted', function (req, res) {

    let names = req.body.name;

    greeting.greet(names)
    res.redirect('/')
})

//counter
webApp.post('/counter', function (req, res) {

    greeting.recordNames(req.body.actionType)

    res.redirect('/')

})

// initialise session middleware - flash-express depends on it
// webApp.use(session({
//     secret: "<add a secret string here>",
//     resave: false,
//     saveUninitialized: true
// }));

// //display warning messages using a flash message
// webApp.get('/addFlash', function (req, res) {
//     req.flash('info', 'Flash Message Added');
//     res.redirect('/');
// });

webApp.get('/greetedNames', function (req, res) {

    res.render('greetedNames', { greetedNames: greeting.greetedNames()() });

});

webApp.get('/greetedNames/:actiontype', function (req, res) {
    const actionType = req.params.actiontype;
    res.render('greetedNames', { greetedNames: greeting.actionsFor(actionType) });
  });
  

//start the server
let PORT = process.env.PORT || 3007;

webApp.listen(PORT, function () {
    console.log('App starting at port:', PORT);
});
