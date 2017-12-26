var Product = require('../models/product');

// Create endpoint /api/products for POSTS
exports.postProducts = function (req, res) {
    // Create a new instance of the Product model
    var product = new Product();

    // Set the product properties that came from the POST data
    product.name = req.body.name;
    product.type = req.body.type;
    product.cost = req.body.cost;
    product.userId = req.user._id;

    // Save the product and check for errors
    product.save(function (err) {
        if (err)
            res.send(err);

        res.json({
            message: 'Product added to the basket!',
            data: product
        });
    });
};

// Create endpoint /api/products for GET
exports.getProducts = function (req, res) {
    // Use the Product model to find all product
    Product.find({
        userId: req.user._id
    }, function (err, products) {
        if (err)
            res.send(err);

        res.json(products);
    });
};


// Create endpoint /api/products/:product_id for GET
exports.getPproduct = function (req, res) {
    // Use the Product model to find a specific product
    Product.find({
        userId: req.user._id,
        _id: req.params.product_id
    }, function (err, product) {
        if (err)
            res.send(err);

        res.json(product);
    });
};

// Create endpoint /api/products/:product_id for PUT
exports.putProduct = function (req, res) {
    // Use the Product model to find a specific product
    Product.update({
        userId: req.user._id,
        _id: req.params.product_id
    }, {
        cost: req.body.cost
    }, function (err, num, raw) {
        if (err)
            res.send(err);

        res.json({
            message: num + ' updated'
        });
    });
};

// Create endpoint /api/products/:product_id for DELETE
exports.deleteProduct = function (req, res) {
    // Use the Product model to find a specific product and remove it
    Product.remove({
        userId: req.user._id,
        _id: req.params.product_id
    }, function (err) {
        if (err)
            res.send(err);

        res.json({
            message: 'Product removed from the basket!'
        });
    });
};