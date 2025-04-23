import { World, errorHandler, getCredentials } from "../../utils/index.js";
import { Request, Response } from "express";

export const handleGetDroppedAssetsWithUniqueName = async (req: Request, res: Response) => {
  try {
    const credentials = getCredentials(req.query);
    const { uniqueName, urlSlug } = credentials;
    const { isPartial = true } = req.query;

    const world = World.create(urlSlug, { credentials });
    const droppedAssets = await world.fetchDroppedAssetsWithUniqueName({
      isPartial: !!isPartial,
      uniqueName,
    });

    return res.json({ droppedAssets, success: true });
  } catch (error) {
    return errorHandler({
      error,
      functionName: "handleGetDroppedAssetsWithUniqueName",
      message: "Error fetching dropped assets with unique name",
      req,
      res,
    });
  }
};
