// IMPORTS
const crypto = require('crypto-js');

// ENCRYPT
const encrypt = (value) => {

	// ENCRYPT VALUES
	const encryptedValue = crypto.AES.encrypt(value, process.env.CRYPTO_SECRET).toString();

	// RETURN ENCRYPTED VALUES
	return encryptedValue;

};

// DECRYPT
const decrypt = (value) => {

	// GET BYTES
	const bytes = crypto.AES.decrypt(value, process.env.CRYPTO_SECRET);

	// DECRYPT VALUE
	const decryptedValue = bytes.toString(crypto.enc.Utf8);

	// RETURN VALUE
	return decryptedValue;

};

// EXPORTS
module.exports = {
	encrypt,
	decrypt,
}