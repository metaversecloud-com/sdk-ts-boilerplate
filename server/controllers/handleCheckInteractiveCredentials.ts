import { errorHandler, getCredentials, User } from "../utils"
import { Request, Response } from "express";

export const handleCheckInteractiveCredentials = async (req: Request, res: Response): Promise<Record<string, any> | void> => {
  try {
    const credentials = getCredentials(req.query);

    if(process.env.INTERACTIVE_KEY !== credentials.interactivePublicKey) throw "Provided public key does not match"

    // if key matches proceed with check using jwt created by topiaInit
    const user = User.create({ credentials });
    const test = await user.checkInteractiveCredentials();
    
    return res.json({ success: true });
  } catch (error) {
    return errorHandler({ error, functionName: "handleCheckInteractiveCredentials", message: "Invalid credentials", req, res });
  }
};
