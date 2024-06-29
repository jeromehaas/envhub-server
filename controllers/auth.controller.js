// IMPORTS
const prismaClient = require('../prisma/prisma.client.js');
const bcryptService = require('../services/bcrypt.service.js');
const jwtService = require('../services/jwt.service.js');

// LOGIN
const login = async (ctx) => {

	// TRY-CATCH BLOCK
	try {

		// GET BODY
		const { body } = ctx.request;

		// CHECK ATTRIBUTES
		if (!body['username']) ctx.throw(500, 'Missing "username" attribute');
		if (!body['pin']) ctx.throw(500, 'Missing "pin" attribute');

		// CHECK IF USER WITH USERNAME EXISTS
		const user = await prismaClient.user.findUnique({
			where: { username: body['username'] },
		});

		// CHECK PIN
		const pinIsValid = await bcryptService.comparePin(body['pin'], user.pin);

		// THROW ERROR IF PIN IS  NOT VALID
		if (!pinIsValid) ctx.throw(500, 'Pin is not valid');

		// CREATE JWT TOKEN
		const token = await jwtService.createToken({
			user: {
				id: user['id'],
				username: user['username'],
			},
		});

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			success: true,
			message: 'Login was successfull',
			data: {
				id: user['id'],
				username: user['username'],
				token: token,
			},
		};

	// HANDLE ERRORS
	} catch (error) {
		ctx.status = 500;
		ctx.body = {
			success: true,
			message: 'Login failed',
			data: null,
		};

	};
};

// EXPORTS
module.exports = {
	login,
};
