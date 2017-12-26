// Load required packages
var mongoose = require('mongoose');

// Define our product schema
var ProductSchema   = new mongoose.Schema({
  name: String,
  type: String,
  cost: Number,
  userId: String
});

// Export the Mongoose model
module.exports = mongoose.model('Product', ProductSchema);