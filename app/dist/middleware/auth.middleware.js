"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = void 0;
const firebase_1 = require("../config/firebase");
const authenticateAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const decodedToken = yield firebase_1.auth.verifyIdToken(token);
        console.log(decodedToken);
        if (decodedToken.email !== "noname69ai@gmail.com") {
            res.status(403).json({ message: "Forbidden" });
            return;
        }
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token", error });
        return;
    }
});
exports.authenticateAdmin = authenticateAdmin;
