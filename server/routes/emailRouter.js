const express = require("express");
const router = express.Router();

const eCategory = require("../models/eMail");

const {
	getCategories,
	addCategory,
	removeCategory,
	getEmails,
	addEmail,
	removeEmail,
} = require("../controllers/emailController");

router.get("/categories", getCategories);

router.post("/categories/add", addCategory);

router.post("/categories/:categoryName/remove", removeCategory);

router.get("/categories/:categoryId/emails", getEmails);

router.post("/categories/:categoryId/emails/add", addEmail);

router.post("/categories/:categoryId/emails/remove", removeEmail);

module.exports = router;
