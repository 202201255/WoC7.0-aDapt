const Location = require('../models/location');
const Vastu = require("../models/vastu")
const cloudinary = require("../services/cloudinary");
const fs = require("fs"); 
const getPlaces = async (req, res) => {
    console.log('jj');
    try {
        const places = await Location.find({});
        console.log("places==>", places);
        return res.json(places);
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({ message: "Failed to fetch places." });
    }
};

const addPlace = async (req, res) => {
    console.log(req.body);
    const { place } = req.body;
    let name = place;
    console.log(name);
    try {
        console.log('jj');


        const existingPlace = await Location.findOne({ name });
        console.log("existingPlace==>", existingPlace);
        if (existingPlace) return res.status(400).json({ message: "Place already exists." });
        console.log("jj");
        
        const place = new Location({ name });
        
        await place.save();
        return res.json(place);
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({ message: "Failed to add place." });
    }
}

const removePlace = async (req, res) => {
    const { placeId } = req.params;

    console.log(placeId);

    try {
        const place = await Location.find({ name: placeId });
        if (!place) return res.status(404).json({ message: "Place not found." });

        await Location.findOneAndDelete({ name: placeId });

		return res
					.status(200)
					.json({ message: "Category deleted successfully" });

    }
    catch (error) {
        console.log("error , ", error);
        return res.status(500).json({ message: "server side error, please try again" });
    }

};

const getLostMessages = async (req, res) => {
	const { placeId } = req.params;

	console.log("placeId==>", placeId);
    try {
        
        const existingPlace = await Location.find({ name: placeId });
        if (!existingPlace) 
            return res.status(404).json({ message: "Place not found." });

		const lostVastu = await Vastu.find({ location: placeId, category: "LOST" });

        console.log("lostMessages ==>", lostVastu);
        
        return res
					.status(200)
					.json({ message: " successfully", lostVastu });
	} catch (error) {
		console.log("error , ", error);
		return res
			.status(500)
			.json({ message: "server side error, please try again" });
	}
};


const getFoundMessages = async (req, res) => {
    const { placeId } = req.params;

		console.log("placeId==>", placeId);
		try {
			const existingPlace = await Location.find({ name: placeId });
			if (!existingPlace)
				return res.status(404).json({ message: "Place not found." });

			const foundVastu = await Vastu.find({ location: placeId, category: "FOUND" });

			console.log("foundMessages==>", foundVastu);

			return res
				.status(200)
				.json({ message: " successfully", foundVastu });
		} catch (error) {
			console.log("error , ", error);
			return res
				.status(500)
				.json({ message: "server side error, please try again" });
		}
}
const sendLostMessage = async (req, res) => {
    const { placeId } = req.params; 
    // console.log(req.file);

    const file = req.file;
    const name = req.body.name;


    console.log(placeId, " ", file, " ", name);
    try {
             const existingPlace = await Location.find({ name: placeId });
							if (!existingPlace)
            return res.status(404).json({ message: "Place not found." });
        
            let result=null; 
            if(req.file)
            result = await cloudinary.v2.uploader.upload(req.file.path, {
                                        resource_type: "auto",
            });
        
        const newLostMessage = await Vastu.create({
					name,
            file: result ? result.secure_url : null,
            location: placeId,
            category: "LOST",
                    
				});
        if (!newLostMessage)
        return res.status(400).json({ message: "not added" });

    return res.status(201).json({ newLostMessage });
		} catch (error) {
			console.log("error , ", error);
			return res
				.status(500)
				.json({ message: "server side error, please try again" });
		}
};
const sendFoundMessage = async (req, res) => {
    const { placeId } = req.params;
		// console.log(req.file);

		const file = req.file;
		const name = req.body.name;

		console.log(placeId, " ", file, " ", name);
		try {
			const existingPlace = await Location.find({ name: placeId });
			if (!existingPlace)
				return res.status(404).json({ message: "Place not found." });

			let result = null;
			if (req.file)
				result = await cloudinary.v2.uploader.upload(req.file.path, {
					resource_type: "auto",
				});

			const newFoundMessage = await Vastu.create({
				name,
				file: result ? result.secure_url : null,
				location: placeId,
				category: "FOUND",
			});
			if (!newFoundMessage)
				return res.status(400).json({ message: " not added" });

			return res.status(201).json({ newFoundMessage });
		} catch (error) {
			console.log("error , ", error);
			return res
				.status(500)
				.json({ message: "server side error, please try again" });
		}
};

const deleteLostMessage = async (req, res) => {
    const { placeId, messageId } = req.params;
    console.log(placeId, " ", messageId);
    try {
        const existingPlace = await Location.find
            ({ name: placeId });
        if (!existingPlace)
            return res.status(404).json({ message: "Place not found." });

        const lostMessage = await Vastu.findOneAndDelete({ _id: messageId });
        if (!lostMessage)
            return res.status(400).json({ message: "not deleted" });

        return res.status(200).json({ message: "deleted successfully" });
    }
    catch (error) {
        console.log("error , ", error);
        return res.status(500).json({ message: "server side error, please try again" });
    }
}

const deleteFoundMessage = async (req, res) => {
    const { placeId, messageId } = req.params;
    console.log(placeId, " ", messageId);
    try {
        const existingPlace = await Location.find
            ({ name: placeId });
        if (!existingPlace)
            return res.status(404).json({ message: "Place not found." });

        const foundMessage = await Vastu.findOneAndDelete({ _id: messageId });
        if (!foundMessage)
            return res.status(400).json({ message: "not deleted" });

        return res.status(200).json({ message: "deleted successfully" });
    }
    catch (error) {
        console.log("error , ", error);
        return res.status(500).json({ message: "server side error, please try again" });
    }
}

const getReplies = async (req, res) => {
    const { place } = req.params;
    const { msgId } = req.body;

    console.log("place==>", place, " ", msgId);
    try {
        const existingPlace = await Location
            .find({ name: place });
        if (!existingPlace)
            return res.status(404).json({ message: "Place not found." });
        
        const vastu = await Vastu.findOne({ _id: msgId, location: place });
        // if (!vastu) {
		// 			console.log("No matching document found");
		// 			return;
		// 		}
        const replies = vastu.comments;
        console.log("replies==>", replies);

        return res.status(200).json({message:"hey", replies });
    }
    catch (error) {
        console.log("error , ", error);
        return res.status(500).json({ message: "server side error, please try again" });
    }

};
const sendReply = async (req, res) => {
    const { place } = req.params;
    const { text, vastuId, senderId } = req.body;
    const filePath = req.file;

    console.log(place, " ", text, vastuId, senderId, filePath);
    
    try {
        let result = null;
        if (req.file)
            result = await cloudinary.v2.uploader.upload(req.file.path);
        
        const existingVastu = await Vastu.findOne({
            _id: vastuId,
            location: place,
        });

        if (!existingVastu) {
					return res.status(404).json({ message: "Question not found" });
        }
        const newAnswer = {
					text,
					senderId,
					file: result ? result.url : null,
					vastuId,
        };
        existingVastu.comments.push(newAnswer);
		await existingVastu.save();
		console.log("ajd", newAnswer);
		
		return res
			.status(201)
			.json({ message: "Answer added successfully", newAnswer });
    }
    catch (error) {
		console.error("Error adding answer:", error);
		return res.status(500).json({ message: "Server error. Please try again." });
    }
    finally {
        if(req.file)
            await fs.unlinkSync(req.file.path);
        }
    
};
module.exports = {
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
};