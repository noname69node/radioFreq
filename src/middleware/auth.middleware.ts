import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebase";

export const authenticateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const decodedToken = await auth.verifyIdToken(token);
    console.log(decodedToken);
    if (decodedToken.email !== "noname69ai@gmail.com" || decodedToken.email !== "nonamenodejs@gmail.com") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error });
    return;
  }
};
