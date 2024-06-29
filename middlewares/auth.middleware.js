// IMPORTS
const prismaClient = require('../prisma/prisma.client.js');
const jwtService = require('../services/jwt.service.js');

// AUTH
const auth = async (ctx, next) => {

	// TRY-CATCH BLOCK
	try {

		// CHECK HEADERS
		if (!ctx.req.headers || !ctx.req.headers.authorization) {
			ctx.throw(401, 'Authorization header is not sent');
		};

		// GET TOKEN
		const token = ctx.req.headers.authorization;

		// DECODE TOKEN
		const decodedToken = await jwtService.verifyToken(token);

		// GET USER
		const user = await prismaClient.user.findUnique({
			where: { id: decodedToken.data.user.id },
		});

		// CHECK IF USER EXIST
		if (!user) ctx.throw(401, 'User does not exist');

		// APPEND USER TO STATE
		ctx.state.user = {
			username: user.username,
		};

		// CONTINUE TO NEXT FUNCTION
		await next();

	// HANDLE ERRORS
	} catch (error) {
		ctx.status = 500;
		ctx.body = {
			success: false,
			message: error.message,
			data: null,
		};
	};

};

// EXPORTS
module.exports = auth;
