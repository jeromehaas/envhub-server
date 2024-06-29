// IMPORTS
const { PrismaClient } = require('@prisma/client');

// SETUP PRISMA VARIABLE
let prismaClient;

// IF PRODUCTION ENVIRONMENT RETURN CLIENT
if (process.env.NODE_ENV === 'production') {
	prismaClient = new PrismaClient();

// IN DEVELOPMENT MODE MAKE SURE TO REUSE EXITING CLIENT IF EXISTING
} else {

	// IF PRIMA-CLIENT DOES NOT EXIST -> CREAT NEW
	if (!global.prismaClient) global.prismaClient = new PrismaClient();

	// ASSIGN GLOBAL CLIENT
	prismaClient = global.prismaClient;

};

// EXPORTS
module.exports = prismaClient;