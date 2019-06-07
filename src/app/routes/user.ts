import * as express from 'express';

import * as handlers from '../controllers/user';

const router = express.Router();

router.route('/:id').delete(handlers.deleteUser);

router.route('/signup').post(handlers.signupUser);
router.route('/login').post(handlers.loginUser);

export default router;
