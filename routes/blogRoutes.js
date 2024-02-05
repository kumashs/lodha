// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Update route
router.route('/update').post(blogController.updateBlog);

// Delete route
router.route('/delete/:blog_id').delete(blogController.deleteBlog);

//Retrive Route
router.route('/retrieve').get(blogController.retrieveBlog);

//Create Route
router.route('/createAndStore').post(blogController.createAndStore);

module.exports = router;
