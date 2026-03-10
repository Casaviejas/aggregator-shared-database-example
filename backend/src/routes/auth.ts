import express, { Router } from "express";
import { register } from "../controllers/auth.controller";
import { validateRegister } from "../middlewares/validate.middleware";

const router: Router = express.Router();

// POST /auth/register
router.post("/register", validateRegister, register);

export default router;
