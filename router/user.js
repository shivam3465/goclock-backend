import express from 'express';
import {currentUser, login, logout, message, register} from '../controllers/user.js'
import { authenticated } from '../middlewares/auth.js';

const router=express.Router();

router.post('/login',login)
router.post('/register',register)
router.get('/logout',logout)
router.get('/message',authenticated,message)
router.get('/me',authenticated,currentUser)

export default router;