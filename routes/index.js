// IMPORTS
const Router = require('koa-router');
const projectsRouter = require('./projects.router.js');
const secretsRouter = require('./secrets.router.js');
const usersRouter = require('./users.router.js');
const authRouter = require('./auth.router.js');

// SETUP ROUTER
const router = new Router();

// ROUTES
router.use('/secrets', secretsRouter.routes());
router.use('/projects', projectsRouter.routes());
router.use('/users', usersRouter.routes());
router.use('/auth', authRouter.routes());

// EXPORT
module.exports = router;
