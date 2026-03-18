import express from "express"
import isAuth from "../middleware/isAuth.js"
import { createCreditsOrder, stripeWebhook } from "../controllers/credits.controller.js"

const creditRouter = express.Router()

creditRouter.post("/order", isAuth, createCreditsOrder)
creditRouter.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook) // ✅ ADD THIS

export default creditRouter;