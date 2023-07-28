import { Router } from "express";
import { CheckUserName } from "../controllers/user.controllers.js";
import PermissionCheck from "../middleware/permissionCheck.js";

const router = Router();

router.post("/searchUsername", PermissionCheck("user"), CheckUserName);

export default router;
