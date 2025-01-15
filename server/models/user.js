const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const { createHmac, randomBytes } = require("crypto");
const { createToken } = require("../services/authentication");

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		salt: {
			type: String,
			// required: true,
		},
		password: {
			type: String,
			required: true,
		},
		profileImage: {
			type: String,
			default: "/images/profile.jpg",
		},
		role: {
			type: String,
			enum: ["USER", "ADMIN"],
			default: "USER",
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
			.update(user.password)
			.digest("hex");
     this.salt = salt;
			this.password = hashedPassword;

			next();
})


userSchema.static(
	"matchPasswordAndGenerateToken",
	async function (email, password) {
		const user = await this.findOne({ email });
		// console.log(givenEmail);
		// console.log(givenPassword);
		// console.log(user);

		if (!user) throw new Error("User not fount!");

		const salt = user.salt;
		const hashedPassword = user.password;

		const userProvidedHash = createHmac("sha256", salt)
			.update(password)
			.digest("hex");
		// console.log(hashedPassword);
		// console.log(userProvidedHash);

		if (hashedPassword !== userProvidedHash)
			throw new Error("Incorrect password, Try again!");

		// return user;
		const token = createToken(user);
		return token;
	}
);

const User = mongoose.model('user', userSchema);

module.exports = User;