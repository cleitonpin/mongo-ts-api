import { Router } from 'express'

// middlewares
import uploads from './middleware/upload';
import authMiddleware from './middleware/authentication';

// controllers
import UserController from './controllers/UserController'
import AuthController from './controllers/AuthController';

const router = Router();

router.get('/', UserController.index);
router.post('/', UserController.create)
router.delete('/:_id', authMiddleware, UserController.delete)

router.post('/upload/:_id', uploads.single('image'), UserController.upload)
//  AUTHENTICATION ROUTE
router.post('/sigin', AuthController.authenticate);

export { router }