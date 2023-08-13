import { Router, query } from "express";
import Analytics from "../controllers/analytics.controllers.js";

const router = Router()

router.get('/updateanalytics',Analytics)

export default router