import express from 'express';
import { allTransporter, sendMessage } from '../controllers/transporter.js';
import { authenticated } from '../middlewares/auth.js';

const router= express.Router();

router.put('/message',authenticated,sendMessage)
router.get('/all',authenticated,allTransporter)

export default router;