import { Request, Response } from "express";
import { addProfileToWorldDataObject, errorHandler, getCredentials } from "../../utils/index.js"

export const handleUpdateWorldDataObject = async (req: Request, res: Response) => {
  try {
    const credentials = getCredentials(req.query);

    const dataObject = await addProfileToWorldDataObject(credentials);

    return res.json({ dataObject, success: true });
  } catch (error) {
    return errorHandler({
      error,
      functionName: "handleUpdateWorldDataObject",
      message: "Error updating world data object",
      req,
      res,
    });
  }
};
