const express = require("express");
const User = require("../models/user");
const router = express.Router();

const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the uploads directory
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
        // Extract file extension from mimetype
        const ext =
            path.extname(file.originalname) || `.${file.mimetype.split("/")[1]}`; // Fallback for extension

        // Create a unique filename with the correct extension
        cb(null, `${Date.now()}${ext}`);
    },
});

const upload = multer({ storage });


// Import controllers for each route
const {
	getPlaces,
	addPlace,
	removePlace,
	getFoundMessages,
	getLostMessages,
	sendLostMessage,
	sendFoundMessage,
	deleteLostMessage,
	deleteFoundMessage,
	getReplies,
	sendReply,
} = require("../controllers/lnfController");

router.get("/places", getPlaces);
router.post("/places/add", addPlace);
router.delete("/places/:placeId/remove", removePlace);

router.get("/places/:placeId/messages/lost", getLostMessages);
router.get("/places/:placeId/messages/found", getFoundMessages);

router.post(
	"/places/:placeId/messages/lost",
	upload.single("file"),
	sendLostMessage
);
router.post(
	"/places/:placeId/messages/found",
	upload.single("file"),
	sendFoundMessage
);

router.delete("/places/:placeId/messages/lost/:messageId", deleteLostMessage);

router.delete("/places/:placeId/messages/found/:messageId", deleteFoundMessage);

router.post("/places/:place/replies", getReplies);

router.post("/places/:place/reply", upload.single("file"), sendReply);
module.exports = router;
