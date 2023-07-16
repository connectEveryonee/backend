import { Router } from "express";
import {
  GetSimpleLink,
  UpdateSimpleLink,
} from "../controllers/SimpleLink.controllers.js";
import PermissionCheck from "../middleware/permissionCheck.js";
import { AuthCheck } from "../middleware/authCheck.js";

const router = Router();
router.post("/create", AuthCheck(), PermissionCheck("user"), UpdateSimpleLink);
router.get("/get/:user", GetSimpleLink);

export default router;
