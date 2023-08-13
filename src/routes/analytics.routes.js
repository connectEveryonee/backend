import { Router, query } from "express";
import Analytics, {
  PageAnalytics,
} from "../controllers/analytics.controllers.js";

const router = Router();

router.get("/updateanalytics", Analytics);
router.get("/pageanalytics", PageAnalytics);

export default router;
