const { validateToken } = require("../services/authentication");

//to check if user is logged in or out
function checkForAuthenticationCookie(cookieName) {
	return (req, res, next) => {
		const tokenCookieValue = req.cookies[cookieName];

		if (!tokenCookieValue) return next();

		try {
			const userPayload = validateToken(tokenCookieValue);
			req.user = userPayload;
		} catch (error) {
			console.log(error);
		}
		next();
	};
}

module.exports = {
	checkForAuthenticationCookie,
};
