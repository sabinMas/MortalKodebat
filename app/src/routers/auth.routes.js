import { Router } from 'express';
import { getRegisterPage, postRegister, getLoginPage, postLogin, postLogout } from '../controllers/auth.controller.js';

const router = Router();

router.get('/register', getRegisterPage);
router.post('/register', postRegister);

router.get('/login', getLoginPage);
router.post('/login', postLogin);

router.post('/logout', postLogout);

export default router;