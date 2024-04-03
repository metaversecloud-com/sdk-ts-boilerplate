import { NextFunction, Request, Response } from "express";
import { errorHandler, getCredentials } from "../utils/index.js"

export const checkInteractiveCredentials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const credentials = getCredentials(req.query);

    if (process.env.INTERACTIVE_KEY !== credentials.interactivePublicKey) {
      throw "Provided public key does not match."
    }

    return next();
  } catch (error) {
    return errorHandler({ error, functionName: "checkInteractiveCredentials", message: "Invalid credentials", req, res });
  }
};
