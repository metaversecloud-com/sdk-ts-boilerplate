import { Request, Response } from "express";
import { World, errorHandler, getCredentials } from "../../utils/index.js";

export const handleGetWorldDetails = async (req: Request, res: Response) => {
  try {
    const credentials = getCredentials(req.query);
    const { includeDataObject } = req.body;

    const world = World.create(credentials.urlSlug, { credentials });
    await world.fetchDetails();
    if (includeDataObject) await world.fetchDataObject();

    return res.json({ world, success: true });
  } catch (error) {
    return errorHandler({
      error,
      functionName: "getWorldDetails",
      message: "Error getting world details",
      req,
      res,
    });
  }
};
