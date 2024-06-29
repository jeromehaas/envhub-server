// IMPORTS
const Router = require('koa-router');
const usersController = require('../controllers/users.controller.js');

// CREATE ROUTER
const router = new Router();

// ROUTES
router.post('/', usersController.create);

// EXPORTS
module.exports = router;
