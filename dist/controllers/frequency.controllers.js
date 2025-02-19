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
exports.getAllFrequencies = exports.getLatestFrequency = exports.addFrequency = void 0;
const firebase_1 = require("../config/firebase");
const addFrequency = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { frequency_37, frequency_38, description } = req.body;
        const newEntry = {
            timestamp: Date.now(),
            frequency_37,
            frequency_38,
            description,
        };
        yield firebase_1.db.collection("frequencies").add(newEntry);
        res.status(201).json({ message: "Frequency added successfully" });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Failed to add frequency", error });
        return;
    }
});
exports.addFrequency = addFrequency;
const getLatestFrequency = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield firebase_1.db
            .collection("frequencies")
            .orderBy("timestamp", "desc")
            .limit(1)
            .get();
        if (snapshot.empty) {
            res.status(404).json({ message: "No data available" });
            return;
        }
        res.status(200).json(snapshot.docs[0].data());
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve frequency", error });
        return;
    }
});
exports.getLatestFrequency = getLatestFrequency;
const getAllFrequencies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield firebase_1.db
            .collection("frequencies")
            .orderBy("timestamp", "desc")
            .get();
        const data = snapshot.docs.map((doc) => doc.data());
        res.status(200).json(data);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve frequencies", error });
        return;
    }
});
exports.getAllFrequencies = getAllFrequencies;
