import { Router } from "express";
import { registerUser } from "../controllers/register_user.js";
import { userLogin } from "../controllers/user_login.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", userLogin);

export default router;
