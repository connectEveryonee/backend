import { Router } from "express";
import { AuthCheck } from "../middleware/authCheck.js";

/** routes */
import authroute from "./auth.routes.js";
import roleRoute from "./roles.routes.js";
import permissionRoute from "./permission.routes.js";
import SimpleLinkRoute from "./SimpleLink.routes.js";
import UserRoute from "./user.routes.js";

const router = Router();

router.use("/auth", authroute);
router.use("/roles", AuthCheck(), roleRoute);
router.use("/permissions", AuthCheck(), permissionRoute);
router.use("/simplelink", SimpleLinkRoute);
router.use("/user", UserRoute);

export default router;
