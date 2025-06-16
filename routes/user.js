import express from 'express';
import { login, register } from '../controllers/user.js';



const router = express.Router();

// register route
//@endpoint /api/user/register
router.post("/register",register)

// login route
//@api/user/login
router.post("/login",login)








export default router;
