"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const frequency_controllers_1 = require("../controllers/frequency.controllers");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.authenticateAdmin, frequency_controllers_1.addFrequency);
router.get("/latest", frequency_controllers_1.getLatestFrequency);
router.get("/all", auth_middleware_1.authenticateAdmin, frequency_controllers_1.getAllFrequencies);
router.get("/", (req, res) => {
    res.send("Frequency routes initialized");
});
exports.default = router;
