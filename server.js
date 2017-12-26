// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var dbConfig = require('./db');
var bodyParser = require('body-parser');
var Product = require('./models/product');

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
var productsRoute = router.route('/products');

// Create endpoint /api/products for POSTS
productsRoute.post(function (req, res) {
    // Create a new instance of the Product model
    var product = new Product();

    // Set the product properties that came from the POST data
    product.name = req.body.name;
    product.type = req.body.type;
    product.cost = req.body.cost;

    // Save the product and check for errors
    product.save(function (err) {
        if (err)
            res.send(err);

        res.json({
            message: 'Product added to the basket!',
            data: product
        });
    });
});

// Create endpoint /api/products for GET
productsRoute.get(function (req, res) {
    // Use the Product model to find all product
    Product.find(function (err, products) {
        if (err)
            res.send(err);

        res.json(products);
    });
});

// Create a new route with the /products/:product_id prefix
var productRoute = router.route('/products/:product_id');

// Create endpoint /api/products/:product_id for GET
productRoute.get(function (req, res) {
    // Use the Product model to find a specific product
    Product.findById(req.params.product_id, function (err, product) {
        if (err)
            res.send(err);

        res.json(product);
    });
});

// Create endpoint /api/products/:product_id for PUT
productRoute.put(function (req, res) {
    // Use the Product model to find a specific product
    Product.findById(req.params.product_id, function (err, product) {
        if (err)
            res.send(err);

        // Update the existing product cost
        product.cost = req.body.cost;

        // Save the product and check for errors
        product.save(function (err) {
            if (err)
                res.send(err);

            res.json(product);
        });
    });
});

// Create endpoint /api/products/:product_id for DELETE
productRoute.delete(function(req, res) {
    // Use the Product model to find a specific product and remove it
    Product.findByIdAndRemove(req.params.product_id, function(err) {
      if (err)
        res.send(err);
  
      res.json({ message: 'Product removed from the basket!' });
    });
  });

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Server run on port ' + port);