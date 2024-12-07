import Router from 'express';

import { docentcontrollers }  from '../controllers/docent.controllers.js';

const router = Router();

router.get('/docent', docentcontrollers.getAllDoces)

router.get('/docent/:id', docentcontrollers.getDoces)

router.post('/docent', docentcontrollers.createDoces)

router.delete('/docent/:id', docentcontrollers.deleteDoces)

router.put('/docent/:id', docentcontrollers.updateDoces)

export default router;