// IMPORTS
const Router = require('koa-router');
const projectsController = require('../controllers/projects.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

// SETUP ROUTER
const router = new Router();

// ROUTES
router.get('/:id', projectsController.find);
router.get('/', projectsController.findAll);
router.post('/', projectsController.create);
router.put('/:id', projectsController.update);
router.delete('/:id', projectsController.destroy);

// EXPORTS
module.exports = router;
