// IMPORTS
const Router = require('koa-router');
const secretsController = require('../controllers/secrets.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

// SETUP ROUTER
const router = new Router();

// ROUTES
router.get('/:id/:environment',  secretsController.find);
router.get('/:id',  secretsController.find);
router.get('/', secretsController.findAll);
router.post('/', secretsController.create);
router.put('/:id', secretsController.update);
router.delete('/:id', secretsController.destroy);

// EXPORTS
module.exports = router;
