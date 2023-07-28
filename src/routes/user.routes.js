import { Router } from "express";
import { CheckUserName } from "../controllers/user.controllers.js";

const router = Router();

router.post("/searchUsername", CheckUserName);

export default router;
