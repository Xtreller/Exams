const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');


module.exports = (app) => {

    app.engine('.hbs',handlebars({extname:'.hbs'}));
    app.set('view engine', '.hbs');
    app.use(cookieParser())
    app.use(express.urlencoded({ extended: true }));
    app.use(auth);
    app.use(express.static("static"));


};