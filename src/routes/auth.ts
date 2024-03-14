import express from "express";
import * as controllers from "@/controllers";

const router = express.Router();

router.post('/register', controllers.auth.register);
router.post('/login', controllers.auth.login);

export default router;