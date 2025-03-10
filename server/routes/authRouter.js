const express = require('express');
const User = require('../models/user');
const router = express.Router();


// Import controllers for each route
const {
	signup,
	login,
	adminSignup,
	adminLogin,
	checkAuth,
} = require("../controllers/authController");

router.post('/check', checkAuth);

// Define routes
router.post("/signup", signup);
// router.route('/signup').post(signup);

router.post('/login', login);
router.post('/adminsignup', adminSignup);
router.post('/adminlogin', adminLogin);

module.exports = router;