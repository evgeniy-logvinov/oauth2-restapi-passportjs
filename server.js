// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var dbConfig = require('./db');
var bodyParser = require('body-parser');
var productController = require('./controllers/product');
var userController = require('./controllers/user');

// Connect to the productBasket MongoDB
mongoose.connect(dbConfig.url);

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

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
var productsRoute = router.route('/products')
    .post(productController.postProducts)
    .get(productController.getProducts);

// Create a new route with the /products/:product_id prefix
var productRoute = router.route('/products/:product_id')
    .get(productController.getPproduct)
    .put(productController.putProduct)
    .delete(productController.deleteProduct);

// Create endpoint handlers for /users
var usersRoute = router.route('/users')
    .get(userController.getUsers)
    .post(userController.postUsers);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Server run on port ' + port);