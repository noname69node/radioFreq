import { Request, Response } from "express";
import { db } from "../config/firebase";
import { Frequency } from "../models/frequency.model";

export const addFrequency = async (req: Request, res: Response) => {
  try {
    const { frequency_37, frequency_38, description } = req.body;

    const newEntry: Frequency = {
      timestamp: Date.now(),
      frequency_37,
      frequency_38,
      description,
    };

    await db.collection("frequencies").add(newEntry);

    res.status(201).json({ message: "Frequency added successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to add frequency", error });
    return;
  }
};

export const getLatestFrequency = async (req: Request, res: Response) => {
  try {
    const snapshot = await db
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
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve frequency", error });
    return;
  }
};

export const getAllFrequencies = async (req: Request, res: Response) => {
  try {
    const snapshot = await db
      .collection("frequencies")
      .orderBy("timestamp", "desc")
      .get();
    const data = snapshot.docs.map((doc) => doc.data());

    res.status(200).json(data);
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve frequencies", error });
    return;
  }
};
