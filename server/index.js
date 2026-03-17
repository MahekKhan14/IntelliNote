import './config.js'

import express from 'express';
import connectDb from './utils/connectDb.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import notesRouter from './routes/generate.route.js';
import pdfRouter from './routes/pdf.route.js';
import creditRouter from './routes/credits.route.js';
import { stripeWebhook } from './controllers/credits.controller.js';

const app = express();

app.post(
  "/api/credits/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

app.use(cors({
  origin: "https://intellinoteclient.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1); // ✅ REQUIRED for Render + secure cookies

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json({ message: "NotesGPT Backend Running!" });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/credit", creditRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});
