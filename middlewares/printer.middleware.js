// IMPORTS
const { red, green, yellow, blue, white } = require('kleur');

// PRINTER
const printer = async (ctx, next) => {

	// TRY-CATCH BLOCK
	try {

		// EXECUTE THE ROUTER
		await next();

		// GET REQUEST PROPERTIES
		let { path, method } = ctx.request;

		// GET RESPONSE PROPERTIES
		let { status } = ctx.response;

		// SETUP PARAMS OBJECT
		const params = {};

		// MEHTOD
		if 			(method === 'GET')		method = `[${blue(method)}]`;
		else if (method === 'POST')		method = `[${green(method)}]`;
		else if (method === 'PUT') 		method = `[${yellow(method)}]`;
		else if (method === 'DELETE') method = `[${red(method)}]`;
		else 													method = `[${white(method)}]`;

		// STATUS
		if 			(status >= 10 && status < 200)		status = `[${blue(status)}]`;
		else if (status >= 200 && status < 300)		status = `[${green(status)}]`;
		else if (status >= 300 && status < 400)		status = `[${yellow(status)}]`;
		else if (status >= 400 && status < 600)		status = `[${red(status)}]`;
		else 																			status = `[${white(status)}]`;

		// PRINT
		console.log(`${ method.padEnd(18, ' ') } ${ path.padEnd(70, ' -') } ${ status }`);

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
module.exports = printer;
