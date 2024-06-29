// IMPORTS
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// SETUP DOTENV
dotenv.config();

// CREATE TOKEN
const createToken = async (payload) => {

	// CREATE TOKEN
	const token = await jwt.sign({
		exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
		data: payload,
	}, process.env.JWT_SECRET);

	// RETURN TOKEN
	return token;

};

// VERIFY TOKEN
const verifyToken = async (token) => {

	// DECODE TOKEN
	const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

	// RETURN VERIFIED TOKEN
	return decodedToken;

};

// EXPORTS
module.exports = {
	createToken,
	verifyToken,
};
