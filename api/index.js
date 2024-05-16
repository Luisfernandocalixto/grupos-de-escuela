// .env
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
//


// initialization
const app = express()


// setting
app.set('port', process.env.PORT || 3000);
// detail order /src
app.set('views', path.join(__dirname, '../src/views/'));

app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//  routes
app.use(require('../src/routes/links.js'));
//  public
app.use(express.static(path.join(__dirname, '../src/public')));


// page 404
app.get((req, res) => {
    res.render("Error");
});
//  starting server
app.listen(app.get('port'), () => {
    console.log('Server on port', 'http://localhost:' + app.get('port'));
});




module.exports = app;



