// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var dbConfig = require('./db');
var oauth2 = require('./oauth2');
var bodyParser = require('body-parser');
var productController = require('./controllers/product');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');
var clientController = require('./controllers/client');
var ejs = require('ejs');
var session = require('express-session');
var oauth2Controller = require('./controllers/oauth2');


// Connect to the productBasket MongoDB
mongoose.connect(dbConfig.url);

// Create our Express application
var app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({
    secret: oauth2.secret,
    saveUninitialized: true,
    resave: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function (req, res) {
    res.json({
        message: 'Server run correctly!'
    });
});

// Create a new route with the prefix /products
router.route('/products')
    .post(authController.isAuthenticated, productController.postProducts)
    .get(authController.isAuthenticated, productController.getProducts);

// Create a new route with the /products/:product_id prefix
router.route('/products/:product_id')
    .get(authController.isAuthenticated, productController.getPproduct)
    .put(authController.isAuthenticated, productController.putProduct)
    .delete(authController.isAuthenticated, productController.deleteProduct);

// Create endpoint handlers for /users
router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

// Create endpoint handlers for /clients
router.route('/clients')
    .post(authController.isAuthenticated, clientController.postClients)
    .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
    .get(authController.isAuthenticated, oauth2Controller.authorization)
    .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
    .post(authController.isClientAuthenticated, oauth2Controller.token);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Server run on port ' + port);