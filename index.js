//Connecting all required npm packages
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const auth = require('./services/auth.js');
const userController = require('./controllers/users');
const recipeController = require('./controllers/recipes');

//Internal variables
const app = express();
const PORT = process.env.PORT || 8080;

//Parse mustache templates in html files and set directory
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

//Setting up web session, cookies and morgan
app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true
}));
app.use(cookieParser());
app.use(logger('dev'));

//Setting up authorizations
app.use(auth.passportInstance);
app.use(auth.passportSession);

//Getting data
app.use(bodyParser.urlencoded({ extended:true }));

//ROUTES
const Router = express.Router();
Router.get('/', (req, res) => {
	res.render('index');
});
app.use('/', Router);
app.use('/recipes', recipeController);
app.use('/users', userController);
// app.use('/tasks', recipeController);

app.use(express.static(__dirname + '/public'));

//Start server
app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
})