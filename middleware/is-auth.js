const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const authHeader = req.get("Authorization");
	if (!authHeader) {
		const error = new Error("Not authenticated.");
		error.statusCode = 401;
		throw error;
	}
	//get is used to access to the headers, split is used to get only the token and ignore the Bearer text convention
	const token = req.get("Authorization").split(" ")[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
	} catch (err) {
		err.status = 401;
		throw err;
	}
	if (!decodedToken) {
		const error = new Error("Not authenticated.");
		error.statusCode = 401;
		throw error;
	}
	console.log(decodedToken);
	req.userId = decodedToken.id;
	next();
};
