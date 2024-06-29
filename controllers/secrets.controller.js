// IMPORTS
const prismaClient = require('../prisma/prisma.client');
const cryptoService = require('../services/crypto.service');

// GET ALL
const findAll = async (ctx) => {

	// TRY-CATCH BLOCK
	try {

		// CONST PROJECT-ID
		const { projectId }  = ctx.query

		// GET ALL SECRETS
		const secrets = await prismaClient.secret.findMany({ 
		});

		// THROW AN ERROR IF NO SECRET IS FOUND
		if (!secrets.length) { throw new Error('Secrets not found'); };

		// DECRYPT VALUES
		secrets.forEach((secret) => {
			secret['value'] = cryptoService.decrypt(secret['value']);
		});

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			success: true,
			message: 'Secrets has been fetched',
			data: {
				secrets: secrets,
			},
		};

	// HANDLE ERRORS
	} catch (error) {
		ctx.status = 500;
		ctx.body = {
			success: false,
			message: error.message,
			data: { 
				secrets: [],
			}
		};
	};

};

// GET ONE
const find = async (ctx) => {

	// TRY-CATCH BLOCK
	try {

		// GET ID
		const { id } = ctx.params;

		// GET SECRET
		const secrets = await prismaClient.secret.findMany({});


		// THROW AN ERROR IF SECRET IS NOT FOUND
		if (!secret) throw new Error('Secret not found');

		// DECRYPT VALUE
		secret['value'] = cryptoService.decrypt(secret['value']);

		// DECRYPT VALUES
		secrets.forEach((secret) => {
			secret['value'] = cryptoService.decrypt(secret['value']);
		});

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			success: true,
			message: 'Secrets has been fetched',
			data: {
				secrets: secrets,
			},
		};

	// HANDLE ERRORS
	} catch (error) {
		ctx.status = 500;
		ctx.body = {
			success: false,
			message: error.message,
			data: {
				secret: {},
			}
		};
	};

};

// CREATE
const create = async (ctx) => {

	// TRY-CATCH BLOCK
	try {

		// GET BODY
		const { body } = ctx.request;

		// CHECK ATTRIBUTES
		if (!body['name']) throw new Error('Missing "name" attribute');
		if (!body['value']) throw new Error('Missing "value" attribute');
		if (!body['environment']) throw new Error('Missing "environment" attribute');
		if (!body['projectId']) throw new Error('Missing "projectId" attribute');

		// ENCRYPT VALUE
		body['value'] = cryptoService.encrypt(body['value']);

		// CREATE SECRET
		const secret = await prismaClient.secret.create({
			data: {
				name: body['name'],
				value: body['value'],
				environment: body['environment'],
				projectId: body['projectId'],
				createdAt: body['createdAt'],
			},
		});

		// THROW ERROR IF SECRET WAS NOT CREATED
		if (!secret) throw new Error('Secret could not be created');

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			success: true,
			message: 'Secret has been created',
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
	};

};

// DESTROY
const destroy = async (ctx) => {

	// TRY-CATCH BLOCK
	try {

		// GET ID
		const { id } = ctx.params;

		// GET SECRET
		await prismaClient.secret.deleteMany({
			where: { id: id },
		});

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			success: true,
			message: 'Secret has been deleted',
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
	};

};

// UPDATE
const update = async (ctx) => {

	// TRY-CATCH BLOCK
	try {

		// GET ID
		const { id } = ctx.params;

		// CHECK PARAMETER
		if (!id) throw new Error('Missing "id" parameter');

		// GET BODY
		const { body } = ctx.request;

		// CHECK ATTRIBUTES
		if (!body['value']) throw new Error('Missing "value" attribute');

		// ENCRYPT VALUE
		body['value'] = cryptoService.encrypt(body['value']);
		console.log(body['value']);

		// CREATE SECRET
		const secret = await prismaClient.secret.update({
			where: { id: id },
			data: {
				value: body['value'],
			},
		});

		// THROW ERROR IF SECRET WAS NOT CREATED
		ctx.assert(secret, 500, 'Secret could not be updated');

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			success: true,
			data: {
				secret: secret,
			},
		};

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
module.exports = {
	findAll,
	find,
	create,
	destroy,
	update,
};
