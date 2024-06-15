import { Router } from "express";
import { registerAdmin, loginAdmin } from "../controllers/admin.contoller.js";


const adminrouter=Router();

adminrouter.route('/register-admin').post(registerAdmin)
adminrouter.route('/login-admin').post(loginAdmin)

export { adminrouter };