import express from "express";
import {
  addFrequency,
  getLatestFrequency,
  getAllFrequencies,
} from "../controllers/frequency.controllers";
import { authenticateAdmin } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authenticateAdmin, addFrequency);
router.get("/latest", getLatestFrequency);
router.get("/all", authenticateAdmin, getAllFrequencies);
router.get("/", (req, res) => {
  res.send("Frequency routes initialized");
});

export default router;
