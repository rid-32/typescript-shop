import * as express from 'express';

import * as handlers from './handlers';

const router = express.Router();

router.route('/:id').delete(handlers.deleteUser);

router.route('/signup').post(handlers.signupUser);

export default router;
