// IMPORTS
const prismaClient = require('../prisma/prisma.client.js');
const bcryptService = require('../services/bcrypt.service.js');

// CREATE
const create = async (ctx) => {

	// TRY-CATCH BLOCK
	try {

		// GET BODY
		const { body } = ctx.request;

		// CHECK ATTRIBUTES
		if (!body['username']) ctx.throw(500, 'Missing "username" attribute');
		if (!body['pin']) ctx.throw(500, 'Missing "pin" attribute');

		// CHECK IF USER WITH USERNAME ALREADY EXIST
		const existingUser = await prismaClient.user.findUnique({
			where: { username: body['username'] },
		});

		// THROW ERROR IF USERNAME ALREADY EXIST
		if (existingUser) ctx.throw(500, 'Username is already taken');

		// HASH PIN
		body['pin'] = await bcryptService.hashPin(body['pin']);

		// CREATE USER
		await prismaClient.user.create({
			data: {
				username: body['username'],
				pin: body['pin'],
			},
		});

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			success: false,
			message: 'User has been created',
			data: null,
		};

	// HANDLE ERRORS
	} catch (error) {
		ctx.status = 500;
		ctx.body = {
			success: false,
			message: error.message,
			data: null,
		};

	}

};

// EXPORTS
module.exports = {
	create,
};
