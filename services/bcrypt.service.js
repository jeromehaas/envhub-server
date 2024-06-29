// IMPORTS
const bcrypt = require('bcrypt');

// DEFINE SALT-ROUND
const saltRound = 10;

// HASH PASSWORD
const hashPin = async (pin) => {

	// HASH PASSWORD
	const hashedPin = await bcrypt.hash(pin, saltRound);

	// RETURN PASSWORD
	return hashedPin;

};

// COMPARE PASSWORD
const comparePin = async (pin, hash) => {

	// COMPARE PASSWORD
	const comparedPin = await bcrypt.compare(pin, hash);

	// RETURN PASSWORD
	return comparedPin;

};

// EXPORTS
module.exports = {
	hashPin,
	comparePin,
};
