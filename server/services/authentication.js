const JWT = require('jsonwebtoken');

const secret = "Jayrathod19";


function createToken(user) {
	const payload = {
		_id: user._id,
		email: user.email,
		profileImageURL: user.profileImageURL,
		// profileImage: user.profileImage,
		role: user.role,
	};

	const token = JWT.sign(payload, secret);

	return token;
}

function validateToken(token) {
	try {
		if (!token) {
			throw new Error("Token is required");
		}

		// Replace `secret` with an environment variable or configuration if needed
		const payload = JWT.verify(token, secret);

		return payload; // Return the decoded payload if valid
	} catch (error) {
		// Handle specific JWT errors
		if (error.name === "TokenExpiredError") {
			throw new Error("Token has expired");
		} else if (error.name === "JsonWebTokenError") {
			throw new Error("Invalid token");
		} else {
			throw new Error("Failed to validate token");
		}
	}
}


module.exports = {
	createToken,
	validateToken,
};
