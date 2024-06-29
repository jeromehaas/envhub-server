// IMPORTS
const Router = require('koa-router');
const authController = require('../controllers/auth.controller.js');

// SETUP ROUTER
const router = new Router();

// ROUTES
router.post('/', authController.login);

// EXPORT
module.exports = router;
