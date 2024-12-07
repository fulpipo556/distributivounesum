import Router from 'express';

import { acticontrollers }  from '../controllers/acti.controllers.js';

const router = Router();



router.get('/acti/:id', acticontrollers.getActivi)

router.get('/acti', acticontrollers.getAllActivi)

router.post('/acti', acticontrollers.createActivi)

router.delete('/acti/:id', acticontrollers.deleteActivi)

router.put('/acti/:id', acticontrollers.updateActivi)

export default router;