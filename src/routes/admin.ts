import express from "express";
import { authenticateAdmin } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/check", authenticateAdmin, (req, res) => {
  res.json({ isAdmin: true });
});

export default router;
