// IMPORTS
const prismaClient = require('../prisma/prisma.client');
const cryptoService = require('../services/crypto.service');

// GET ALL
const findAll = async (ctx) => {

	// TRY-CATCH BLOCK
	try {

		// GET ALL SECRETS
		const projects = await prismaClient.project.findMany({
			include: {
				secrets: true,
			},
		});

		// THROW AN ERROR IF SECRET IS NOT FOUND
		if (!projects.length) throw new Error('No projects found');

		// DECRYPT VALUES
		projects.forEach((project) => {
			project.secrets.forEach((secret) => {
				secret['value'] = cryptoService.decrypt(secret['value']);
			});
		});

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			success: true,
			message: 'Secrets has been fetched',
			data: {
				projects: projects,
			},
		};

	// HANDLE ERROS
	} catch (error) {
		ctx.status = 500;
		ctx.body = {
			success: false,
			message: error.message,
			data: null,
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
		if (!body['name']) ctx.throw(500, 'Missing "name" attribute');

		// FIND EXISTING PROJECT
		const existingProject = await prismaClient.project.findUnique({
			where: { name: body['name'] },
		});

		// THROW AN ERROR IF SECRET IS NOT FOUND
		if (existingProject) { throw new Error('Project already exists'); };

		// CREATE PROJECT
		const project = await prismaClient.project.create({
			data: {
				name: body['name'],
			},
		});

		// PRINT SUCCESS MESSAGE
		console.log('[GET] /projects');

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			success: true,
			message: 'Project has been created',
			data: {
				project: project,
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

// FIND
const find = async (ctx) => {

	// TRY-CATCH BLOCK
	try {

		// GET ID
		const { id } = ctx.params;

		// GET SECRET
		const project = await prismaClient.project.findUnique({
			where: { id: id },
			include: {
				secrets: true,
			},
		});

		// THROW AN ERROR IF SECRET IS NOT FOUND
		if (!project) throw new Error('Project not found');

		// DECRYPT VALUES
		project.secrets.forEach((secret) => {
			secret['value'] = cryptoService.decrypt(secret['value']);
		});

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			success: true,
			message: 'Project has been fetched',
			data: {
				project: project,
			},
		};

	// HANDLE ERRORS
	} catch (error) {
		ctx.status = 500;
		ctx.body = {
			success: false,
			message: error.message,
			data: {
				project: {}
			}
		};
	};

};

// UPDATE
const update = async (ctx) => {

	// TRY-CATCH BLOCK
	try {

		// GET ID
		const { id } = ctx.params;

		// GET BODY
		const { body } = ctx.request;

		// THROW AN ERROR IF SECRET IS NOT FOUND
		if (!body['name']) { throw new Error('Missing name attribute'); }

		// GET SECRET
		const project = await prismaClient.project.update({
			where: { id: id },
			data: {
				name: body['name'],
			},
		});

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			success: true,
			message: 'Project has been updated',
			data: {
				project: project,
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

// DESTROY
const destroy = async (ctx) => {

	// GET ID
	const { id } = ctx.params;

	// DELETE ALL SECRETS FROM PROJECT
	await prismaClient.secret.deleteMany({
		where: { projectId: id },
	});

	// DELETE PROJECT
	await prismaClient.project.deleteMany({
		where: { id: id },
	});

	// SEND RESPONSE
	ctx.status = 200;
	ctx.body = {
		success: true,
		message: 'Project has been deleted',
		data: null,
	};

};

// EXPORTS
module.exports = {
	findAll,
	find,
	update,
	create,
	destroy,
};
