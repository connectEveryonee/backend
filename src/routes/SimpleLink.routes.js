import { Router } from "express";
import {
  DeleteLinkItems,
  GetSimpleLink,
  UpdateLinkItems,
  UpdateSimpleLink,
} from "../controllers/SimpleLink.controllers.js";
import PermissionCheck from "../middleware/permissionCheck.js";
import { AuthCheck } from "../middleware/authCheck.js";

const router = Router();
router.post("/create", PermissionCheck("user"), UpdateSimpleLink);
router.post("/updateLink", PermissionCheck("user"), UpdateLinkItems);
router.post("/deleteLinkElement", PermissionCheck("user"), DeleteLinkItems);
router.get("/get/:user", GetSimpleLink);

export default router;
