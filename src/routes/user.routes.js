import { Router } from "express";
import { CheckUserName, GetUser } from "../controllers/user.controllers.js";
import PermissionCheck from "../middleware/permissionCheck.js";
import { AuthCheck } from "../middleware/authCheck.js";

const router = Router();

router.post("/searchUsername", CheckUserName);
router.post("/getUser", PermissionCheck("user"), GetUser);

export default router;
