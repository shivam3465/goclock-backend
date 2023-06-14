import express from 'express';
import { authenticated } from '../middlewares/auth.js';
import { allManufacturer } from '../controllers/manufacturer.js';
import { sendMessageManufacturer } from '../controllers/manufacturer.js';

const router=express.Router();

router.put('/message',authenticated,sendMessageManufacturer);
router.get('/all',authenticated,allManufacturer);

export default router;